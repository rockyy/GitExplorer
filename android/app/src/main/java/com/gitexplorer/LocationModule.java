package com.gitexplorer;

import android.content.ActivityNotFoundException;
import android.text.TextUtils;
import android.widget.Toast;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import android.util.Log;
import android.location.Address;
import android.location.Geocoder;

import java.util.Locale;
import java.util.List;


import com.facebook.react.bridge.Callback;

import android.location.Location;
import android.content.Context;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactContext;

import android.os.Build;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import android.location.LocationManager;
import android.os.SystemClock;

public class LocationModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;
    private Context context;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DeviceLocation";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        return constants;
    }


  


    @ReactMethod
    public void getLocalityByLatLong(final String latitude, final String longitude, final Callback callback) {
        Geocoder geocoder;
        List<Address> addresses;
        geocoder = new Geocoder(getReactApplicationContext(), Locale.getDefault());
        String address = "";
        String knownName = "";

        try {
            addresses = geocoder.getFromLocation(Double.parseDouble(latitude), Double.parseDouble(longitude), 1); // Here 1 represent max location result to returned, by documents it recommended 1 to 5
            address = addresses.get(0).getAddressLine(0); // If any additional address line present than only, check with max available address lines by getMaxAddressLineIndex()
            String city = addresses.get(0).getLocality();
            String state = addresses.get(0).getAdminArea();
            String country = addresses.get(0).getCountryName();
            String postalCode = addresses.get(0).getPostalCode();
            knownName = addresses.get(0).getFeatureName();
            callback.invoke(address);
        } catch (Exception e) {
            callback.invoke(address);
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void requestLocation() {
        

        NativeGeoLocation.getInstance().init(getCurrentActivity(), new NativeGeoLocation.ILocation() {
            @Override
            public void getLocation(Location location) {
                System.out.print(location);
            }

            @Override
            public void getAddress(String locationAddress) {

            }

            @Override
            public void getPermissionStatus(Boolean locationPermission) {

            }
        });
        NativeGeoLocation.getInstance().checkPermissions(getCurrentActivity(), new NativeGeoLocation.ILocation() {
            @Override
            public void getLocation(Location location) {
                if (location != null) {
                    DeviceLocation deviceLocation = new DeviceLocation();
                    deviceLocation.setLatitude(location.getLatitude());
                    deviceLocation.setLongitude(location.getLongitude());
                    Geocoder geocoder;
                    List<Address> addresses;
                    geocoder = new Geocoder(getReactApplicationContext(), Locale.getDefault());
                    String address = "";

                    try {
                        addresses = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
                        address = addresses.get(0).getAddressLine(0);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    deviceLocation.setAddress(address);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
                        deviceLocation.setMock(location.isFromMockProvider());
                    } else {
                        deviceLocation.setMock(false);
                    }
                    Gson gson = new GsonBuilder().setPrettyPrinting().create();
                    sendEvent(mReactContext, "Location-Found", gson.toJson(deviceLocation));
                    NativeGeoLocation.getInstance().stopLocationUpdates();
                }
            }

            @Override
            public void getAddress(String locationAddress) {

            }

            @Override
            public void getPermissionStatus(Boolean locationPermission) {

            }
        });
    }

    @ReactMethod
    public void isLocationEnable(final Callback callback) {
        LocationManager locationManager = (LocationManager) getCurrentActivity().getSystemService(context.LOCATION_SERVICE);
        callback.invoke(locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER));
    }

    @ReactMethod
    public void getElapsedTime(final Callback callback) {
        // System time in milliseconds
        long time = SystemClock.elapsedRealtime();

        // React Native bridge complains if we try to pass back a long directly
        callback.invoke(String.valueOf(time));
    }



    @ReactMethod
    public void exitApp() {
        getCurrentActivity().finish();
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName, String location) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, location);
    }
}