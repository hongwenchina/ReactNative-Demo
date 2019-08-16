// RCTGigyaWebView.h
#import <UIKit/UIKit.h>
#import <React/RCTWebView.h>
#import <GigyaSDK/Gigya.h>

@interface RCTGigyaWebView : RCTWebView<GSWebBridgeDelegate,UIWebViewDelegate>

@end