package com.gigyareactnative;

import android.app.Activity;
import android.support.annotation.Nullable;
import android.webkit.WebView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.webview.ReactWebViewManager;

import com.gigya.socialize.GSObject;
import com.gigya.socialize.android.GSWebBridge;
import com.gigya.socialize.android.event.GSWebBridgeListener;

@ReactModule(name = GigyaWebViewManager.REACT_CLASS)
public class GigyaWebViewManager extends ReactWebViewManager {
  /* This name must match what we're referring to in JS */
  protected static final String REACT_CLASS = "RCTGigyaWebView";

  protected static class GigyaWebViewClient extends ReactWebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView webView, String url) {
      if (GSWebBridge.handleUrl(webView, url)) {
        return true;
      }
      return false;
    }
  }

  protected static class GigyaWebView extends ReactWebView {
    public GigyaWebView(ThemedReactContext reactContext) {
      super(reactContext);
    }
  }

  @Override
  protected ReactWebView createReactWebViewInstance(ThemedReactContext reactContext) {
    return new GigyaWebView(reactContext);
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
    view.setWebViewClient(new GigyaWebViewClient());
  }

  @ReactProp(name = "source")
  public void setSource(WebView view, @Nullable ReadableMap source) {
    Activity mActivity = ((ThemedReactContext) view.getContext()).getCurrentActivity();

    if (mActivity != null) {
      GSWebBridge.attach(mActivity, view, new GSWebBridgeListener() {
        @Override
        public void onPluginEvent(WebView webView, GSObject gsObject, String s) { }
      });
    }

    super.setSource(view, source);
  }

  @Override
  public void onDropViewInstance(WebView webView) {
    GSWebBridge.detach(webView);
    super.onDropViewInstance(webView);
  }
}