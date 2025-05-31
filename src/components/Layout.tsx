
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { User, LogOut, Users, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, switchUser } = useAuth();

  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-indigo-600">
                ExamHub
              </div>
              <div className="text-sm text-gray-600">
                {user.role === 'admin' ? 'Admin Panel' : 'Student Portal'}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Demo Switch User Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant={user.role === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => switchUser('admin')}
                  className="text-xs"
                >
                  <Users className="w-3 h-3 mr-1" />
                  Admin
                </Button>
                <Button
                  variant={user.role === 'student' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => switchUser('student')}
                  className="text-xs"
                >
                  <User className="w-3 h-3 mr-1" />
                  Student
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700 font-medium">
                  {user.name}
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
