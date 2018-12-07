package com.touchmenotapps.esftest;

import android.webkit.WebView;

public class WebCallbackInterface {

    WebView webView;

    public WebCallbackInterface(WebView w) {
        this.webView = w;
    }

    public void setImageCallback(String id, String imagePath) {
        webView.loadUrl("javascript:nativeImagePickerCallback('" + id + "','file://" + imagePath + "');");
    }

    public void onViewInitCallback(String data) {
        webView.loadUrl("javascript:nativeViewInitCallback('" + data + "');");
    }
}
