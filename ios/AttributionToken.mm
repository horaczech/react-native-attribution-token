//
//  AttributionToken.mm
//  AttributionToken
//
//  Created by Petr Horacek on 19.09.2024.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AttributionToken, NSObject)

RCT_EXTERN_METHOD(getAttributionToken:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
