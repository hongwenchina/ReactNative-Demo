import React from 'react';
import {
  WebView,
  requireNativeComponent,
  NativeModules,
} from 'react-native';
import PropTypes from 'prop-types';

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

GigyaWebView.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string,
  }).isRequired,
}

const RCTGigyaWebView = requireNativeComponent(
  'RCTGigyaWebView',
  GigyaWebView,
  WebView.extraNativeComponentConfig,
);
