// RCTGigyaWebView.m
#import <GigyaSDK/Gigya.h>
#import <React/RCTConvert.h>
#import "RCTGigyaWebView.h"
#import "RCTWebView+Custom.h"

@interface RCTGigyaWebView ()

@end

@implementation RCTGigyaWebView {
  UIWebView *_gigyaWebView;
}

- (void)setSource:(NSDictionary *)source
{
  // Get the webview instance from parent class (RCTWebView).
  _gigyaWebView = [self valueForKey:@"_webView"];

  // Register the webview with the Gigya web bridge.
  [GSWebBridge registerWebView:_gigyaWebView delegate:self];
  [NSHTTPCookieStorage sharedHTTPCookieStorage].cookieAcceptPolicy =
          NSHTTPCookieAcceptPolicyAlways;

  // Call the setSource method on the parent class (RCTWebView).
  [super setSource:source];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request
navigationType:(UIWebViewNavigationType)navigationType {
  NSLog(@"request url: %@a", request);

  // If the Gigya web bridge handled the request, then tell this class not to handle the request.
  if ([GSWebBridge handleRequest:request webView:_gigyaWebView]) {
    return NO;
  }

  // Otherwise, let the parent class implementation determine whether to handle this request.
  BOOL allowed = [super webView:webView shouldStartLoadWithRequest:request navigationType:navigationType];
  return allowed;
}

- (void)webViewDidStartLoad:(UIWebView *)webView {
  [GSWebBridge webViewDidStartLoad:_gigyaWebView];
}

@end
