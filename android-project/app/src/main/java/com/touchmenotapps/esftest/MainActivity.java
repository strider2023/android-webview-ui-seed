package com.touchmenotapps.esftest;

import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    private static final int SELECT_PICTURE = 1;
    private static final int REQUEST_IMAGE_CAPTURE = 2;

    private WebView webView;
    private WebAppInterface webAppInterface;
    private WebCallbackInterface webCallbackInterface;
    private String selectedImagePath;
    private AppUtils appUtils;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        appUtils = new AppUtils();
        webView = findViewById(R.id.webview);
        webAppInterface = new WebAppInterface(this);
        webCallbackInterface = new WebCallbackInterface(webView);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.addJavascriptInterface(webAppInterface, "ESFApp");

        webView.loadUrl("file:///android_asset/app/index.html");
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                new Handler().postDelayed(new Runnable() {
                    public void run() {
                        webCallbackInterface.onViewInitCallback(null);
                    }
                }, 2500);
            }
        });
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            switch (requestCode) {
                case SELECT_PICTURE:
                    Uri selectedImageUri = data.getData();
                    selectedImagePath = appUtils.getPath(this, selectedImageUri);
                    if(selectedImagePath != null && webView!=null){
                        Log.d("ESF Test", selectedImagePath);
                        webCallbackInterface.setImageCallback(webAppInterface.getImageContainerId(), selectedImagePath);
                    } else
                        Log.e("ESF Test", "Null path");
                    break;
                case REQUEST_IMAGE_CAPTURE:
                    Log.d("ESF Test", webAppInterface.getCurrentPhotoPath());
                    webCallbackInterface.setImageCallback(webAppInterface.getImageContainerId(), webAppInterface.getCurrentPhotoPath());
                    break;
            }
        }
    }


}
