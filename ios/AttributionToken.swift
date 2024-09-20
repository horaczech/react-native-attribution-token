//
//  AttributionToken.swift
//  AttributionToken
//
//  Created by Petr Horacek on 19.09.2024.
//

import Foundation
import AdServices

@objc(AttributionToken)
class AttributionToken: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(getAttributionToken:rejecter:)
  func getAttributionToken(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    if #available(iOS 14.3, *) {
      Task {
        do {
          let token = try await getAttributionTokenWithRetry()
          resolve(token)
        } catch {
          reject("ERROR_FETCHING_TOKEN", "Failed to fetch attribution token after multiple attempts", error)
        }
      }
    } else {
      reject("UNSUPPORTED_IOS_VERSION", "Attribution token is only available on iOS 14.3 and later", nil)
    }
  }

  @available(iOS 14.3, *)
  private func getAttributionTokenWithRetry(attempts: Int = 0) async throws -> String {
    do {
      return try AAAttribution.attributionToken()
    } catch {
      if (error as NSError).code == 404 && attempts < 2 {
        try await Task.sleep(nanoseconds: 5_000_000_000) // 5 seconds
        return try await getAttributionTokenWithRetry(attempts: attempts + 1)
      } else {
        throw error
      }
    }
  }
}
