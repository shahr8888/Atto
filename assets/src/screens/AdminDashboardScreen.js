import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboardScreen() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data for admin dashboard
  const systemStats = {
    totalEmployees: 45,
    presentToday: 38,
    onLeave: 5,
    absent: 2,
    avgAttendance: 92,
  };

  const recentActivity = [
    { id: 1, type: 'leave_request', user: 'Sarah Johnson', action: 'Applied for annual leave', time: '2 hours ago' },
    { id: 2, type: 'attendance', user: 'Michael Chen', action: 'Late check-in reported', time: '3 hours ago' },
    { id: 3, type: 'employee', user: 'New Employee', action: 'Emily Rodriguez joined', time: '1 day ago' },
    { id: 4, type: 'system', user: 'System', action: 'Monthly report generated', time: '2 days ago' },
  ];

  const departments = [
    { name: 'Engineering', employees: 18, present: 16, attendance: 89 },
    { name: 'Sales', employees: 12, present: 11, attendance: 92 },
    { name: 'Marketing', employees: 8, present: 7, attendance: 88 },
    { name: 'HR', employees: 7, present: 4, attendance: 57 },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'leave_request': return 'calendar';
      case 'attendance': return 'time';
      case 'employee': return 'person-add';
      case 'system': return 'settings';
      default: return 'information-circle';
    }
  };

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons name={getActivityIcon(item.type)} size={20} color="#007aff" />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>{item.action}</Text>
        <Text style={styles.activityUser}>{item.user}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </View>
  );

  const renderDepartmentItem = ({ item }) => (
    <View style={styles.departmentItem}>
      <Text style={styles.departmentName}>{item.name}</Text>
      <View style={styles.departmentStats}>
        <Text style={styles.departmentStat}>{item.present}/{item.employees} Present</Text>
        <Text style={styles.departmentAttendance}>{item.attendance}% Attendance</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>System Overview</Text>
      </View>

      <View style={styles.tabSelector}>
        {['overview', 'employees', 'reports'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabButtonText,
              selectedTab === tab && styles.activeTabButtonText
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === 'overview' && (
        <>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="people" size={32} color="#007aff" />
              <Text style={styles.statValue}>{systemStats.totalEmployees}</Text>
              <Text style={styles.statLabel}>Total Employees</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={32} color="#34c759" />
              <Text style={styles.statValue}>{systemStats.presentToday}</Text>
              <Text style={styles.statLabel}>Present Today</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={32} color="#ff9500" />
              <Text style={styles.statValue}>{systemStats.onLeave}</Text>
              <Text style={styles.statLabel}>On Leave</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="close-circle" size={32} color="#ff3b30" />
              <Text style={styles.statValue}>{systemStats.absent}</Text>
              <Text style={styles.statLabel}>Absent</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Department Overview</Text>
            <FlatList
              data={departments}
              renderItem={renderDepartmentItem}
              keyExtractor={(item) => item.name}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <FlatList
              data={recentActivity}
              renderItem={renderActivityItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </>
      )}

      {selectedTab === 'employees' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Management</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="person-add" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Add Employee</Text>
              <Text style={styles.actionSubtitle}>Register new employee</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="people" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Manage Employees</Text>
              <Text style={styles.actionSubtitle}>Edit employee details</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="settings" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Role Management</Text>
              <Text style={styles.actionSubtitle}>Assign roles & permissions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="stats-chart" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Performance</Text>
              <Text style={styles.actionSubtitle}>Employee analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {selectedTab === 'reports' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reports & Analytics</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="document-text" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Attendance Report</Text>
              <Text style={styles.actionSubtitle}>Generate attendance reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Leave Report</Text>
              <Text style={styles.actionSubtitle}>Leave usage analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="bar-chart" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Department Stats</Text>
              <Text style={styles.actionSubtitle}>Department-wise analysis</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="download" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Export Data</Text>
              <Text style={styles.actionSubtitle}>Download CSV/PDF reports</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 4,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    margin: 16,
    borderRadius: 8,
    padding: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: '#007aff',
  },
  tabButtonText: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#ffffff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  departmentItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  departmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  departmentStat: {
    fontSize: 14,
    color: '#8e8e93',
  },
  departmentAttendance: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '500',
  },
  activityItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  activityUser: {
    fontSize: 13,
    color: '#007aff',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 2,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#8e8e93',
    textAlign: 'center',
    marginTop: 4,
  },
});