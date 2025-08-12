export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmployeeId = (id) => {
  // Employee ID should be alphanumeric and 6-10 characters
  const idRegex = /^[A-Z0-9]{6,10}$/;
  return idRegex.test(id);
};

export const validatePassword = (password) => {
  // Password should be at least 8 characters
  return password && password.length >= 8;
};

export const validateLeaveApplication = (application) => {
  const errors = {};
  
  if (!application.type) {
    errors.type = 'Leave type is required';
  }
  
  if (!application.startDate) {
    errors.startDate = 'Start date is required';
  }
  
  if (!application.endDate) {
    errors.endDate = 'End date is required';
  }
  
  if (application.startDate && application.endDate) {
    const start = new Date(application.startDate);
    const end = new Date(application.endDate);
    
    if (start > end) {
      errors.endDate = 'End date must be after start date';
    }
    
    if (start < new Date()) {
      errors.startDate = 'Start date cannot be in the past';
    }
  }
  
  if (!application.reason || application.reason.trim().length < 10) {
    errors.reason = 'Reason must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const calculateLeaveDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  
  return Math.max(0, dayDiff);
};