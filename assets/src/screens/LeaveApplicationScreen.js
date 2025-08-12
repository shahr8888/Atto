import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function LeaveApplicationScreen({ navigation }) {
  const { user } = useAuth();
  const { applyLeave } = useData();
  
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  
  const [loading, setLoading] = useState(false);

  const leaveTypes = [
    { id: 'annual', name: 'Annual Leave', icon: 'calendar' },
    { id: 'sick', name: 'Sick Leave', icon: 'medical' },
    { id: 'personal', name: 'Personal Leave', icon: 'person' },
  ];

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = async () => {
    if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.reason.length < 10) {
      Alert.alert('Error', 'Please provide a detailed reason (minimum 10 characters)');
      return;
    }

    setLoading(true);

    try {
      const leaveData = {
        ...formData,
        employeeId: user.id,
        days: calculateDays(),
        approver: user.role === 'employee' ? 'EMP002' : 'ADMIN001', // Manager or Admin
      };

      const result = applyLeave(leaveData);
      
      Alert.alert(
        'Success',
        'Your leave application has been submitted successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit leave application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Apply for Leave</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Leave Type *</Text>
          <View style={styles.typeSelector}>
            {leaveTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeOption,
                  formData.type === type.id && styles.selectedTypeOption
                ]}
                onPress={() => setFormData({ ...formData, type: type.id })}
              >
                <Ionicons
                  name={type.icon}
                  size={24}
                  color={formData.type === type.id ? '#ffffff' : '#8e8e93'}
                />
                <Text style={[
                  styles.typeOptionText,
                  formData.type === type.id && styles.selectedTypeOptionText
                ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Start Date *</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#8e8e93"
            value={formData.startDate}
            onChangeText={(text) => setFormData({ ...formData, startDate: text })}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>End Date *</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#8e8e93"
            value={formData.endDate}
            onChangeText={(text) => setFormData({ ...formData, endDate: text })}
          />
        </View>

        {formData.startDate && formData.endDate && (
          <View style={styles.durationInfo}>
            <Text style={styles.durationText}>
              Duration: {calculateDays()} day(s)
            </Text>
          </View>
        )}

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Reason *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please provide a detailed reason for your leave..."
            placeholderTextColor="#8e8e93"
            value={formData.reason}
            onChangeText={(text) => setFormData({ ...formData, reason: text })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          * Your application will be sent to your manager for approval. You will be notified once it's processed.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  form: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'column',
    gap: 12,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  selectedTypeOption: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  typeOptionText: {
    fontSize: 16,
    color: '#8e8e93',
    marginLeft: 12,
    fontWeight: '500',
  },
  selectedTypeOptionText: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  durationInfo: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 20,
  },
});