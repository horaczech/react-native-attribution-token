import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { getAttributionToken } from 'react-native-attribution-token';

export default function App() {
  const [result, setResult] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAttributionToken();
        setResult(token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={colorScheme === 'dark' ? styles.whiteText : styles.whiteText}
      >
        Result: {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
});
