package com.touchmenotapps.esftest;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class WebAppInterface {

    private static final int SELECT_PICTURE = 1;
    private static final int REQUEST_IMAGE_CAPTURE = 2;

    Context mContext;
    Activity activity;
    String imageContainerId;
    String mCurrentPhotoPath;

    /** Instantiate the interface and set the context */
    WebAppInterface(Activity a) {
        mContext = a.getApplicationContext();
        activity = a;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void showImagePicker(String imageId) {
        imageContainerId = imageId;
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        activity.startActivityForResult(Intent.createChooser(intent,
                "Select Picture"), SELECT_PICTURE);
    }

    @JavascriptInterface
    public void showCamera(String imageId) {
        imageContainerId = imageId;
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(activity.getPackageManager()) != null) {
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException e) {
                // Error occurred while creating the File
                e.printStackTrace();
            }
            // Continue only if the File was successfully created
            if (photoFile != null) {
                Uri photoURI = FileProvider.getUriForFile(mContext,
                        "com.touchmenotapps.esftest.fileprovider",
                        photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                activity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
    }

    @JavascriptInterface
    public void submitPressed(String id, String data) {
        Log.d("Test", data);
        try {
            JSONObject json = new JSONObject(data);
            Toast.makeText(mContext, json.getString("fname"), Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Log.e("Test", e.getMessage());
        }
    }

    public String getImageContainerId() {
        return imageContainerId;
    }

    public String getCurrentPhotoPath() {
        return mCurrentPhotoPath;
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        //activity.getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File storageDir = activity.getExternalFilesDir(Environment.DIRECTORY_PICTURES); //new File(Environment.getExternalStorageDirectory(), "ESF");
        //storageDir.mkdirs();
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );
        Log.d("ESF Test", image.getAbsolutePath());
        // Save a file: path for use with ACTION_VIEW intents
        mCurrentPhotoPath = image.getAbsolutePath();
        return image;
    }
}
