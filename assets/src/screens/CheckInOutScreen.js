import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const { width } = Dimensions.get('window');

export default function CheckInOutScreen({ navigation, route }) {
  const { user } = useAuth();
  const { checkIn } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Office - Main Building');
  const action = route.params?.action || 'checkin';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    Alert.alert(
      'Confirm Check In',
      `Check in at ${location}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check In',
          onPress: () => {
            const record = checkIn(user.id);
            Alert.alert(
              'Success!',
              'You have successfully checked in.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          }
        }
      ]
    );
  };

  const simulateFaceRecognition = () => {
    Alert.alert(
      'Face Recognition',
      'Face recognition feature is not available in this demo.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.date}>
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.locationCard}>
          <Ionicons name="location" size={24} color="#007aff" />
          <Text style={styles.locationText}>{location}</Text>
          <Text style={styles.locationSubtext}>GPS Location Verified</Text>
        </View>

        <TouchableOpacity style={styles.faceRecognitionCard} onPress={simulateFaceRecognition}>
          <Ionicons name="scan" size={48} color="#34c759" />
          <Text style={styles.faceRecognitionText}>Tap for Face Recognition</Text>
          <Text style={styles.faceRecognitionSubtext}>Optional verification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
          <Ionicons name="log-in" size={32} color="#ffffff" />
          <Text style={styles.checkInButtonText}>Check In</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Your attendance will be recorded with timestamp and location.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  time: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  date: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  locationCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 8,
  },
  locationSubtext: {
    fontSize: 14,
    color: '#34c759',
    marginTop: 4,
  },
  faceRecognitionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#34c759',
    borderStyle: 'dashed',
  },
  faceRecognitionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34c759',
    marginTop: 12,
  },
  faceRecognitionSubtext: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  checkInButton: {
    backgroundColor: '#007aff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkInButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  note: {
    fontSize: 14,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 20,
  },
});