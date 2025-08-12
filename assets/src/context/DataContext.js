import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: "LA001",
      employeeId: "EMP001", 
      type: "annual",
      startDate: "2024-08-20",
      endDate: "2024-08-22", 
      days: 3,
      reason: "Family vacation",
      status: "pending",
      appliedDate: "2024-08-10",
      approver: "EMP002"
    },
    {
      id: "LA002",
      employeeId: "EMP003",
      type: "sick",
      startDate: "2024-08-13",
      endDate: "2024-08-13",
      days: 1, 
      reason: "Medical appointment",
      status: "approved",
      appliedDate: "2024-08-12",
      approver: "EMP002",
      approvedDate: "2024-08-12"
    }
  ]);

  const checkIn = (employeeId) => {
    const now = new Date();
    const record = {
      id: Date.now().toString(),
      employeeId,
      date: now.toISOString().split('T')[0],
      checkIn: now.toTimeString().split(' ')[0],
      status: 'present',
      location: 'Office - Main Building'
    };
    
    setAttendanceData(prev => [...prev, record]);
    return record;
  };

  const checkOut = (employeeId) => {
    const now = new Date();
    setAttendanceData(prev => 
      prev.map(record => 
        record.employeeId === employeeId && 
        record.date === now.toISOString().split('T')[0] && 
        !record.checkOut
          ? { ...record, checkOut: now.toTimeString().split(' ')[0] }
          : record
      )
    );
  };

  const applyLeave = (leaveData) => {
    const newApplication = {
      id: `LA${Date.now()}`,
      ...leaveData,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setLeaveApplications(prev => [...prev, newApplication]);
    return newApplication;
  };

  const approveLeave = (leaveId) => {
    setLeaveApplications(prev =>
      prev.map(leave =>
        leave.id === leaveId
          ? { ...leave, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] }
          : leave
      )
    );
  };

  const rejectLeave = (leaveId, reason) => {
    setLeaveApplications(prev =>
      prev.map(leave =>
        leave.id === leaveId
          ? { ...leave, status: 'rejected', rejectionReason: reason }
          : leave
      )
    );
  };

  const getAttendanceByEmployee = (employeeId) => {
    return attendanceData.filter(record => record.employeeId === employeeId);
  };

  const getLeavesByEmployee = (employeeId) => {
    return leaveApplications.filter(leave => leave.employeeId === employeeId);
  };

  const value = {
    attendanceData,
    leaveApplications,
    checkIn,
    checkOut,
    applyLeave,
    approveLeave,
    rejectLeave,
    getAttendanceByEmployee,
    getLeavesByEmployee
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};