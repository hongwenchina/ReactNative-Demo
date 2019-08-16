import React from 'react';
import {
  WebView,
  requireNativeComponent,
  NativeModules,
} from 'react-native';

const { GigyaWebViewManager } = NativeModules;

export default function GigyaWebView(props) {
  return (
    <WebView
      {...props}
      thirdPartyCookiesEnabled
      javaScriptEnabled
      nativeConfig={{
        component: RCTGigyaWebView,
        viewManager: GigyaWebViewManager,
      }}
    />
  );
}

const RCTGigyaWebView = requireNativeComponent(
  'RCTGigyaWebView',
  GigyaWebView,
  WebView.extraNativeComponentConfig,
);
