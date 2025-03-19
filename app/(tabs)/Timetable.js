import React, { useEffect, useState } from 'react';
import { StyleSheet,Button, Text, View, ScrollView, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import * as LocalAuthentication from 'expo-local-authentication';
import axios from 'axios';

const manager = new BleManager();

export default function Timetable() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [biometricType, setBiometricType] = useState(null);
  const [uuid, setUuid] = useState('');
  const [rssi, setRssi] = useState(0);
  const [advertisedServiceUUIDs, setAdvertisedServiceUUIDs] = useState([]);

  useEffect(() => {
    // Check if biometric authentication is supported
    (async () => {
      try {
        const supported = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(supported);

        if (supported) {
          const enrolled = await LocalAuthentication.isEnrolledAsync();
          if (enrolled) {
            const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (biometricTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
              setBiometricType('fingerprint');
            } else if (biometricTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
              setBiometricType('face');
            }
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Biometric support check failed');
        console.error(error);
      }
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      if (!biometricType) {
        Alert.alert('No Biometrics', 'This device has no biometric types available.');
        return;
      }

      let authResult;

      if (biometricType === 'fingerprint') {
        authResult = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with Fingerprint',
          disableDeviceFallback: true,
          cancelLabel: 'Cancel',
        });
      } else if (biometricType === 'face') {
        authResult = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with Face ID',
          disableDeviceFallback: true,
          cancelLabel: 'Cancel',
        });
      }
      if (authResult?.success) {
        setIsAuthenticated(true);
        Alert.alert('Biometric Authenticated');
      } else {
        Alert.alert('Authentication failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'Authentication failed, please try again.');
    }
  };

  const requestBluetoothPermission = async () => {
    console.log('Requesting Bluetooth permission');
    if (Platform.OS === 'ios') {
      return true; // iOS permissions are handled differently
    }

    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      // For Android below 12 (API < 31)
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      // For Android 12+ (API 31+)
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ]);

      return (
        result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    return false; // Permissions not granted
  };

  const scanForBeacons = () => {
    return new Promise((resolve, reject) => {
      let foundDevices = [];
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log('Error scanning for devices:', error);
          reject(error);
          return;
        }

        if (device) {
          console.log('Found device:', device.id, device.name);
          setUuid(device.id);  // Use device.id as the unique identifier
          setRssi(device.rssi);

          // Get the advertised service UUIDs
          if (device.serviceUUIDs) {
            console.log('Advertised Service UUIDs:', device.serviceUUIDs);
            setAdvertisedServiceUUIDs(device.serviceUUIDs); // Set advertised UUIDs in state
            foundDevices.push(...device.serviceUUIDs);
          } else {
            console.log('No advertised service UUIDs found');
          }
        }
      });

      setTimeout(() => {
        manager.stopDeviceScan();
        resolve(foundDevices);
      }, 5000);
    });
  };

  const verify = async () => {
    await handleBiometricAuth();
    if (isAuthenticated) {
      let classuuid = ['uuid1', 'uuid2', 'uuid3'];

      const hasPermission = await requestBluetoothPermission();
      if (!hasPermission) {
        Alert.alert('Permission denied', 'Bluetooth permission is required');
        return;
      }

      const foundUUIDs = await scanForBeacons();
      /*write code to verify if all the uuids are present in the advertisedServiceUUIDs array*/
      if (classuuid.every((val) => foundUUIDs.includes(val))) {
        Alert.alert('Attendance marked successfully');
      } else {
        Alert.alert('UUIDs not found', 'Some required UUIDs are missing');
      }
    }
  };

  const classes = [
    { course: 'MATHS (U18MAT3101-R21)', instructor: 'Dr. Smith', timing: '08:30 AM - 09:30 AM (60 min)' },
    { course: 'PHYSICS (U18PHY3101-R21)', instructor: 'Dr. Johnson', timing: '09:30 AM - 10:30 AM (60 min)' },
    // Add more classes as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TIME TABLE</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Jan 2025</Text>
      </View>
      <ScrollView horizontal style={styles.dateSelector}>
  {['01 MON', '02 TUE', '03 WED', '04 THU', '05 FRI', '06 SAT', '07 SUN'].map((date, index) => (
    <View key={index} style={styles.dateItem}>
      <Button title={date} onPress={() => Alert.alert(`Selected date: ${date}`)} />
    </View>
  ))}
</ScrollView>

      <ScrollView style={styles.classesContainer}>
        {classes.map((item, index) => (
          <View key={index} style={styles.classItem}>
            <Text style={styles.classCourse}>{item.course}</Text>
            <Text style={styles.classInstructor}>{item.instructor}</Text>
            <Text style={styles.classTiming}>{item.timing}</Text>
            <TouchableOpacity style={styles.attendanceButton} onPress={verify}>
              <Text style={styles.attendanceButtonText}>Mark attendance</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'green',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  dateItem: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  dateItemText: {
    fontSize: 16,
  },
  classesContainer: {
    padding: 10,
  },
  classItem: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  classCourse: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  classInstructor: {
    fontSize: 16,
    color: '#555',
  },
  classTiming: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  attendanceButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  attendanceButtonText: {
    color: 'white',
    fontSize: 16,
  },
});