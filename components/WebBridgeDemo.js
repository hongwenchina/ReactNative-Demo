import React from 'react';

import GigyaWebView from './GigyaWebView';

export default function WebBridgeDemo(props) {
  return <GigyaWebView
    source={{ uri: 'https://gheerish.gigya-cs.com/raasDemo/profile.html' }}
  />
}
