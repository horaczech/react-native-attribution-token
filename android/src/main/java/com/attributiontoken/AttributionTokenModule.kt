package com.attributiontoken

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class AttributionTokenModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AttributionToken"
    }

    @ReactMethod
    fun getAttributionToken(promise: Promise) {
        promise.resolve(null)
    }
}
