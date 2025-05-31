
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import StudentDashboard from '../components/student/StudentDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ExamHub</h1>
          <p className="text-xl text-gray-600">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};

export default Index;
