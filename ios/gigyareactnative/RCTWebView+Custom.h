#import <React/RCTWebView.h>

@interface RCTWebView (Custom)
  - (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType;
  - (void)webViewDidStartLoad:(UIWebView *)webView;
  - (void)setSource:(NSDictionary *)source;
@end
