import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const { attendanceData, checkIn, checkOut, getAttendanceByEmployee } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    checkAttendanceStatus();
    return () => clearInterval(timer);
  }, []);

  const checkAttendanceStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = getAttendanceByEmployee(user.id).find(
      record => record.date === today && !record.checkOut
    );
    setIsCheckedIn(!!todayAttendance);
  };

  const handleCheckIn = () => {
    navigation.navigate('CheckInOut', { action: 'checkin' });
  };

  const handleCheckOut = () => {
    Alert.alert(
      'Check Out',
      'Are you sure you want to check out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check Out',
          onPress: () => {
            checkOut(user.id);
            setIsCheckedIn(false);
            Alert.alert('Success', 'Checked out successfully!');
          }
        }
      ]
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Text style={styles.date}>{formatDate(currentTime)}</Text>
        </View>
        
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>{getGreeting()}, {user.name}!</Text>
          <Text style={styles.roleText}>{user.position}</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: isCheckedIn ? '#34c759' : '#007aff' }
            ]}
            onPress={isCheckedIn ? handleCheckOut : handleCheckIn}
          >
            <Ionicons
              name={isCheckedIn ? 'log-out-outline' : 'log-in-outline'}
              size={32}
              color="#ffffff"
            />
            <Text style={styles.actionTitle}>
              {isCheckedIn ? 'Check Out' : 'Check In'}
            </Text>
            <Text style={styles.actionSubtitle}>
              {isCheckedIn ? 'End your workday' : 'Start your workday'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Attendance')}
          >
            <Ionicons name="time-outline" size={32} color="#007aff" />
            <Text style={styles.actionTitle}>Attendance</Text>
            <Text style={styles.actionSubtitle}>View your records</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Leave')}
          >
            <Ionicons name="calendar-outline" size={32} color="#007aff" />
            <Text style={styles.actionTitle}>Leave</Text>
            <Text style={styles.actionSubtitle}>Apply or check status</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-outline" size={32} color="#007aff" />
            <Text style={styles.actionTitle}>Profile</Text>
            <Text style={styles.actionSubtitle}>Manage account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>Days Present</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>40h</Text>
            <Text style={styles.summaryLabel}>Hours Worked</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>0</Text>
            <Text style={styles.summaryLabel}>Days Absent</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 24,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  date: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 4,
  },
  greeting: {
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  roleText: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 4,
  },
  quickActions: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 8,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#8e8e93',
    textAlign: 'center',
    marginTop: 4,
  },
  summary: {
    padding: 24,
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007aff',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
    textAlign: 'center',
  },
});