import {Alert, Platform, Linking} from 'react-native';

export function openLocationSettingDialog() {
  Alert.alert(
    'Enable Device Location',
    'Turn on Device location and select High Accuracy mode to proceed',
    [
      {
        text: 'Enable',
        onPress: () =>
          Platform.OS === 'ios'
            ? DeviceSettings.open()
            : DeviceSettings.location(),
      },
    ],
    {cancelable: true},
  );
}

export function openMaps(location) {
  console.log(`Utility openMaps ${location}`);
  let url = 'https://www.google.com/maps/search/?api=1&query=' + location;
  // let url = 'https://www.google.com/maps/search/?api=1&query=' + 'delhi/jaipur/@27.7856741,75.3552646';
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        alert('Map can not supported by this device.');
        console.log(`Can\'t handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.log(`An error occurred: ${err}`));
}

export function validatedString(text) {
  return text === undefined || text == null || text == '' || text.length == 0
    ? false
    : text;
}
