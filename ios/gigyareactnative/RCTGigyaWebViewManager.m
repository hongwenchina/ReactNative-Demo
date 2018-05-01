// RCTGigyaWebViewManager.m
#import "RCTGigyaWebViewManager.h"
#import "RCTGigyaWebView.h"
#import <GigyaSDK/Gigya.h>

@interface RCTGigyaWebViewManager () <RCTWebViewDelegate>

@end

@implementation RCTGigyaWebViewManager { }

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RCTGigyaWebView *webView = [RCTGigyaWebView new];
  webView.delegate = self;
  return webView;
}

@end
