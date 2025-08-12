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

export default function LeaveScreen({ navigation }) {
  const { user } = useAuth();
  const { getLeavesByEmployee } = useData();
  const [selectedTab, setSelectedTab] = useState('balance');

  const userLeaves = getLeavesByEmployee(user.id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#34c759';
      case 'pending': return '#ff9500';
      case 'rejected': return '#ff3b30';
      default: return '#8e8e93';
    }
  };

  const renderLeaveItem = ({ item }) => (
    <View style={styles.leaveItem}>
      <View style={styles.leaveHeader}>
        <Text style={styles.leaveType}>{item.type.toUpperCase()} LEAVE</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.leaveDuration}>
        {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
      </Text>
      <Text style={styles.leaveDays}>{item.days} day(s)</Text>
      <Text style={styles.leaveReason}>{item.reason}</Text>
      
      <Text style={styles.leaveDate}>
        Applied: {new Date(item.appliedDate).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabSelector}>
          {['balance', 'applications'].map((tab) => (
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
                {tab === 'balance' ? 'Leave Balance' : 'Applications'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate('LeaveApplication')}
        >
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'balance' ? (
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Available Leave Balance</Text>
          
          <View style={styles.balanceGrid}>
            <View style={styles.balanceCard}>
              <Ionicons name="calendar" size={32} color="#007aff" />
              <Text style={styles.balanceType}>Annual Leave</Text>
              <Text style={styles.balanceValue}>{user.leaveBalance.annual}</Text>
              <Text style={styles.balanceLabel}>days remaining</Text>
            </View>

            <View style={styles.balanceCard}>
              <Ionicons name="medical" size={32} color="#34c759" />
              <Text style={styles.balanceType}>Sick Leave</Text>
              <Text style={styles.balanceValue}>{user.leaveBalance.sick}</Text>
              <Text style={styles.balanceLabel}>days remaining</Text>
            </View>

            <View style={styles.balanceCard}>
              <Ionicons name="person" size={32} color="#ff9500" />
              <Text style={styles.balanceType}>Personal Leave</Text>
              <Text style={styles.balanceValue}>{user.leaveBalance.personal}</Text>
              <Text style={styles.balanceLabel}>days remaining</Text>
            </View>
          </View>

          <View style={styles.leavePolicy}>
            <Text style={styles.policyTitle}>Leave Policy</Text>
            <Text style={styles.policyText}>
              • Annual leave can be carried forward up to 5 days{'\n'}
              • Sick leave requires medical certificate for more than 2 days{'\n'}
              • Personal leave must be applied 24 hours in advance{'\n'}
              • Maximum continuous leave is 10 days
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Leave Applications</Text>
          {userLeaves.length > 0 ? (
            <FlatList
              data={userLeaves}
              renderItem={renderLeaveItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="#8e8e93" />
              <Text style={styles.emptyStateText}>No leave applications found</Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate('LeaveApplication')}
              >
                <Text style={styles.emptyStateButtonText}>Apply for Leave</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 2,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007aff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  balanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  balanceCard: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  balanceType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007aff',
    marginTop: 4,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  leavePolicy: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  policyText: {
    fontSize: 14,
    color: '#8e8e93',
    lineHeight: 20,
  },
  leaveItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leaveType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007aff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  leaveDuration: {
    fontSize: 16,
    fontWeight: '600',
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
    color: '#ffffff',
    marginBottom: 8,
  },
  leaveDate: {
    fontSize: 12,
    color: '#8e8e93',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 16,
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#007aff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});