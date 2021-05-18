package com.gitexplorer;

import android.Manifest;
import android.app.Activity;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.location.Geocoder;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.widget.Toast;
import android.os.Bundle;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.GoogleApiClient.ConnectionCallbacks;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResult;
import com.google.android.gms.location.LocationSettingsStatusCodes;

public class NativeGeoLocation implements
        ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener,
        LocationListener {

    private final static int CONNECTION_FAILURE_RESOLUTION_REQUEST = 9 * 1000;
    //new code for permission::start
    private static final int REQUEST_CHECK_SETTINGS = 2000;
    //private static GoogleApiClient mGoogleApiClient;
    private static final int ACCESS_FINE_LOCATION_INTENT_ID = 3;
    private static final String BROADCAST_ACTION = "android.location.PROVIDERS_CHANGED";
    private static NativeGeoLocation self;
    private AddressResultReceiver mResultReceiver;
    private String mAddressOutput;
    private GoogleApiClient mGoogleApiClient;
    private Activity activity;
    private long UPDATE_INTERVAL = 6 * 1000;  /* 6 secs */
    private long FASTEST_INTERVAL = 5 * 1000; /* 5 secs */
    private static Location location;
    private ILocation callBack;

    public static NativeGeoLocation getInstance() {
        if (self == null){
            self = new NativeGeoLocation();
        }
        return self;
    }

    public Location getLocation() {
        return location;
    }

    public void init(Activity activity, ILocation iLocation) {
        this.activity = activity;
        this.callBack = iLocation;
        mGoogleApiClient = new GoogleApiClient.Builder(activity)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API).build();
        mResultReceiver = new AddressResultReceiver(new Handler());
        connectClient();
    }

    private void connectClient() {
        if (isGooglePlayServicesAvailable() && mGoogleApiClient != null) {
            mGoogleApiClient.connect();
        } else {
            Toast.makeText(activity, "Please update the google play services.", Toast.LENGTH_SHORT).show();
        }
    }


    @Override
    public void onConnected( Bundle bundle) {
        // Display the connection status

        boolean permissionGranted = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
        if (permissionGranted) {
            location = LocationServices.FusedLocationApi.getLastLocation(mGoogleApiClient);
            if (location != null) {
                callBack.getLocation(location);
                //For Loaction Address
                if (!Geocoder.isPresent()) {

                    return;
                }
            } else {
                // Toast.makeText(activity, "Current location was null, enable GPS on emulator!", Toast.LENGTH_SHORT).show();
            }


            startLocationUpdates();
        } else {
            ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 200);
        }

    }

    protected void startLocationUpdates() {
        if (!mGoogleApiClient.isConnected()) {
            return;
        }
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationRequest.setInterval(UPDATE_INTERVAL);
        locationRequest.setFastestInterval(FASTEST_INTERVAL);

        boolean permissionGranted = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;

        if (permissionGranted) {
            LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient,
                    locationRequest, this);
        } else {
            ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 200);
        }
    }

    public void stopLocationUpdates() {
        try{
            if(mGoogleApiClient != null && mGoogleApiClient.isConnected()){
                LocationServices.FusedLocationApi.removeLocationUpdates(mGoogleApiClient, this);
            }
        }catch(Exception e){

        }
    }

    public void onLocationChanged(Location location) {
        // Report to the UI that the location was updated
        String msg = "Updated Location: " +
                Double.toString(location.getLatitude()) + "," +
                Double.toString(location.getLongitude());
        // Toast.makeText(activity, msg, Toast.LENGTH_SHORT).show();
        this.location = location;
        callBack.getLocation(location);
        startIntentService();
    }

    /*
     * Called by Location Services if the connection to the location client
     * drops because of an error.
     */
    @Override
    public void onConnectionSuspended(int i) {
        if (i == CAUSE_SERVICE_DISCONNECTED) {
            // Toast.makeText(activity, "Disconnected. Please re-connect.", Toast.LENGTH_SHORT).show();
        } else if (i == CAUSE_NETWORK_LOST) {
            //Toast.makeText(activity, "Network lost. Please re-connect.", Toast.LENGTH_SHORT).show();
        }
    }

    /*
     * Called by Location Services if the attempt to Location Services fails.
     */

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {
        /*
         * Google Play services can resolve some errors it detects. If the error
         * has a resolution, try sending an Intent to start a Google Play
         * services activity that can resolve error.
         */
        if (connectionResult.hasResolution()) {
            try {
                // Start an Activity that tries to resolve the error
                connectionResult.startResolutionForResult(activity,
                        CONNECTION_FAILURE_RESOLUTION_REQUEST);
                /*
                 * Thrown if Google Play services canceled the original
                 * PendingIntent
                 */
            } catch (IntentSender.SendIntentException e) {
                // Log the error
                e.printStackTrace();
            }
        } else {
            //  Toast.makeText(activity,"Sorry. Location services not available to you", Toast.LENGTH_LONG).show();
        }
    }


    private boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability googleAPI = GoogleApiAvailability.getInstance();
        int result = googleAPI.isGooglePlayServicesAvailable(activity);
        if (result != ConnectionResult.SUCCESS) {
            if (googleAPI.isUserResolvableError(result)) {
                googleAPI.getErrorDialog(activity, result,
                        CONNECTION_FAILURE_RESOLUTION_REQUEST).show();
            }

            return false;
        }

        return true;
    }


    protected void startIntentService() {
     /*   // Create an intent for passing to the intent service responsible for fetching the address.
        Intent intent = new Intent(activity, FetchAddressIntentService.class);

        // Pass the result receiver as an extra to the service.
        intent.putExtra(Constants.RECEIVER, mResultReceiver);
        intent.putExtra(Constants.LOCATION_DATA_EXTRA, location);

        // Start the service. If the service isn't already running, it is instantiated and started
        // (creating a process for it if needed); if it is running then it remains running. The
        // service kills itself automatically once all intents are processed.
        activity.startService(intent);*/
    }

    /* Check Location Permission for Marshmallow Devices */
    public boolean checkPermissions(Activity activity, ILocation iLocation) {
        this.callBack = iLocation;
        return checkPermissions(activity, callBack, true);
    }

    public boolean checkPermissions(Activity activity, ILocation callBack, boolean somthing) {
        if (Build.VERSION.SDK_INT >= 23) {
            if (ContextCompat.checkSelfPermission(activity,
                    Manifest.permission.ACCESS_FINE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED) {
                requestLocationPermission(activity);
                return false;
            } else {
                showSettingDialog(activity, callBack);
                return true;
            }

        } else {
            showSettingDialog(activity, callBack);
            return true;
        }
    }

    /*  Show Popup to access User Permission  */
    private void requestLocationPermission(Activity activity) {
        if (ActivityCompat.shouldShowRequestPermissionRationale(activity, Manifest.permission.ACCESS_FINE_LOCATION)) {
            ActivityCompat.requestPermissions(activity,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    ACCESS_FINE_LOCATION_INTENT_ID);

        } else {
            ActivityCompat.requestPermissions(activity,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    ACCESS_FINE_LOCATION_INTENT_ID);
        }
    }

    /* Show Location Access Dialog */
    private void showSettingDialog(final Activity activity, final ILocation callBack) {
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(30 * 1000);
        locationRequest.setFastestInterval(5 * 1000);//5 sec Time interval for location update
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);//Setting priotity of Location request to high
        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
                .addLocationRequest(locationRequest);
        builder.setAlwaysShow(true); //this is the key ingredient to show dialog always when GPS is off
        if (mGoogleApiClient == null) {
            return;
        }
        PendingResult<LocationSettingsResult> result =
                LocationServices.SettingsApi.checkLocationSettings(mGoogleApiClient, builder.build());
        result.setResultCallback(new ResultCallback<LocationSettingsResult>() {
            @Override
            public void onResult(@NonNull LocationSettingsResult result) {
                final Status status = result.getStatus();
                switch (status.getStatusCode()) {
                    case LocationSettingsStatusCodes.SUCCESS:
                        // All location settings are satisfied. The client can initialize location
                        // requests here.
                        startLocationUpdates();
                        if (location != null) {
                            callBack.getPermissionStatus(true);
                        } else {
                            callBack.getPermissionStatus(false);
                            //Toast.makeText(activity, "Finding Location.Please try again", Toast.LENGTH_SHORT).show();
                        }

                        //updateGPSStatus("GPS is Enabled in your device");
                        break;
                    case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
                        // Location settings are not satisfied. But could be fixed by showing the user
                        // a dialog.
                        try {
                            // Show the dialog by calling startResolutionForResult(),
                            // and check the result in onActivityResult().
                            status.startResolutionForResult(activity, REQUEST_CHECK_SETTINGS);
                        } catch (IntentSender.SendIntentException e) {
                            e.printStackTrace();
                            // Ignore the error.
                        }
                        break;
                    case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
                        // Location settings are not satisfied. However, we have no way to fix the
                        // settings so we won't show the dialog.
                        break;
                    default: {
                        callBack.getPermissionStatus(false);
                    }
                }
            }
        });
    }

    public interface ILocation {
        void getLocation(Location location);

        void getAddress(String locationAddress);

        void getPermissionStatus(Boolean locationPermission);
    }

    class AddressResultReceiver extends ResultReceiver {
        public AddressResultReceiver(Handler handler) {
            super(handler);
        }

        /**
         * Receives data sent from FetchAddressIntentService and updates the UI in MainActivity.
         */
        @Override
        protected void onReceiveResult(int resultCode, Bundle resultData) {

            // Display the address string or an error message sent from the intent service.
            //mAddressOutput = resultData.getString(Constants.RESULT_DATA_KEY);
            displayAddressOutput();


            // Reset. Enable the Fetch Address button and stop showing the progress bar.
        }

        private void displayAddressOutput() {
            callBack.getAddress(mAddressOutput);
            //Toast.makeText(activity, ""+mAddressOutput, Toast.LENGTH_SHORT).show();
        }
    }
}
