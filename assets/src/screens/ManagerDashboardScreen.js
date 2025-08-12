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
import { useData } from '../context/DataContext';

export default function ManagerDashboardScreen() {
  const { user } = useAuth();
  const { leaveApplications, approveLeave, rejectLeave } = useData();
  const [selectedTab, setSelectedTab] = useState('team');

  // Mock team data
  const teamMembers = [
    { id: 'EMP001', name: 'Sarah Johnson', status: 'present', checkIn: '09:00', department: 'Engineering' },
    { id: 'EMP003', name: 'Emily Rodriguez', status: 'late', checkIn: '09:15', department: 'Engineering' },
    { id: 'EMP004', name: 'John Smith', status: 'absent', checkIn: null, department: 'Engineering' },
    { id: 'EMP005', name: 'Lisa Chen', status: 'on_leave', checkIn: null, department: 'Engineering' },
  ];

  const pendingLeaveRequests = leaveApplications.filter(leave => leave.status === 'pending');

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#34c759';
      case 'late': return '#ff9500';
      case 'absent': return '#ff3b30';
      case 'on_leave': return '#007aff';
      default: return '#8e8e93';
    }
  };

  const handleLeaveAction = (leaveId, action) => {
    if (action === 'approve') {
      approveLeave(leaveId);
    } else {
      rejectLeave(leaveId, 'Manager decision');
    }
  };

  const renderTeamMember = ({ item }) => (
    <View style={styles.teamMemberItem}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberDepartment}>{item.department}</Text>
      </View>
      <View style={styles.memberStatus}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.replace('_', ' ').toUpperCase()}</Text>
        </View>
        {item.checkIn && <Text style={styles.checkInTime}>Check-in: {item.checkIn}</Text>}
      </View>
    </View>
  );

  const renderLeaveRequest = ({ item }) => (
    <View style={styles.leaveRequestItem}>
      <View style={styles.leaveRequestHeader}>
        <Text style={styles.employeeName}>
          {teamMembers.find(member => member.id === item.employeeId)?.name || 'Unknown Employee'}
        </Text>
        <Text style={styles.leaveType}>{item.type.toUpperCase()} LEAVE</Text>
      </View>
      
      <Text style={styles.leaveDuration}>
        {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
      </Text>
      <Text style={styles.leaveDays}>{item.days} day(s)</Text>
      <Text style={styles.leaveReason}>{item.reason}</Text>
      
      <View style={styles.leaveActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleLeaveAction(item.id, 'approve')}
        >
          <Text style={styles.actionButtonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleLeaveAction(item.id, 'reject')}
        >
          <Text style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Dashboard</Text>
        <Text style={styles.subtitle}>Manage your team</Text>
      </View>

      <View style={styles.tabSelector}>
        {['team', 'leaves', 'reports'].map((tab) => (
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

      {selectedTab === 'team' && (
        <>
          <View style={styles.quickStats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Team Size</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Present</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>Late</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>On Leave</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Team Members - Today</Text>
            <FlatList
              data={teamMembers}
              renderItem={renderTeamMember}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </>
      )}

      {selectedTab === 'leaves' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Leave Requests</Text>
          {pendingLeaveRequests.length > 0 ? (
            <FlatList
              data={pendingLeaveRequests}
              renderItem={renderLeaveRequest}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle" size={64} color="#34c759" />
              <Text style={styles.emptyStateText}>No pending leave requests</Text>
            </View>
          )}
        </View>
      )}

      {selectedTab === 'reports' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Reports</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="document-text" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Team Attendance</Text>
              <Text style={styles.actionSubtitle}>Generate team report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="bar-chart" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Performance</Text>
              <Text style={styles.actionSubtitle}>Team performance metrics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Leave Summary</Text>
              <Text style={styles.actionSubtitle}>Team leave overview</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="download" size={32} color="#007aff" />
              <Text style={styles.actionTitle}>Export</Text>
              <Text style={styles.actionSubtitle}>Download team reports</Text>
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
  quickStats: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007aff',
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
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
  teamMemberItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  memberDepartment: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 2,
  },
  memberStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  checkInTime: {
    fontSize: 12,
    color: '#8e8e93',
  },
  leaveRequestItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  leaveRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  leaveType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007aff',
  },
  leaveDuration: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  leaveDays: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 8,
  },
  leaveReason: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 16,
  },
  leaveActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  approveButton: {
    backgroundColor: '#34c759',
  },
  rejectButton: {
    backgroundColor: '#ff3b30',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 16,
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