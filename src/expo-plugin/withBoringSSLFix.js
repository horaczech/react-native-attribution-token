const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withBoringSSLFix = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );
      let podfileContent = await fs.promises.readFile(podfilePath, 'utf8');

      const boringSSLFix = `
  installer.pods_project.targets.each do |target|
    if target.name == 'BoringSSL-GRPC'
      target.source_build_phase.files.each do |file|
        if file.settings && file.settings['COMPILER_FLAGS']
          flags = file.settings['COMPILER_FLAGS'].split
          flags.reject! { |flag| flag == '-GCC_WARN_INHIBIT_ALL_WARNINGS' }
          file.settings['COMPILER_FLAGS'] = flags.join(' ')
        end
      end
    end
  end
`;

      if (!podfileContent.includes('BoringSSL-GRPC')) {
        const postInstallIndex = podfileContent.lastIndexOf('post_install');
        if (postInstallIndex !== -1) {
          const insertIndex =
            podfileContent.indexOf('end', postInstallIndex) - 1;
          podfileContent =
            podfileContent.slice(0, insertIndex) +
            boringSSLFix +
            podfileContent.slice(insertIndex);
        } else {
          podfileContent += `
post_install do |installer|
  ${boringSSLFix}
end
`;
        }

        await fs.promises.writeFile(podfilePath, podfileContent);
      }

      return config;
    },
  ]);
};

module.exports = withBoringSSLFix;
