
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, Calendar, BarChart3, Settings, Plus, BookOpen } from 'lucide-react';
import ExamManagement from './ExamManagement';
import StudentManagement from './StudentManagement';
import ResultsManagement from './ResultsManagement';
import ProfileManagement from './ProfileManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Students',
      value: '245',
      icon: Users,
      description: 'Active enrolled students',
      color: 'text-blue-600'
    },
    {
      title: 'Active Exams',
      value: '12',
      icon: Calendar,
      description: 'Ongoing examinations',
      color: 'text-green-600'
    },
    {
      title: 'Completed Exams',
      value: '48',
      icon: BookOpen,
      description: 'This academic year',
      color: 'text-purple-600'
    },
    {
      title: 'Average Score',
      value: '78%',
      icon: BarChart3,
      description: 'Overall performance',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-indigo-100">Manage your examination system efficiently</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('exams')}
                >
                  <Plus className="h-5 w-5" />
                  Create New Exam
                </Button>
                <Button 
                  className="h-20 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('students')}
                >
                  <Users className="h-5 w-5" />
                  Add Student
                </Button>
                <Button 
                  className="h-20 flex flex-col gap-2" 
                  variant="outline"
                  onClick={() => setActiveTab('results')}
                >
                  <BarChart3 className="h-5 w-5" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <ExamManagement />
        </TabsContent>

        <TabsContent value="students">
          <StudentManagement />
        </TabsContent>

        <TabsContent value="results">
          <ResultsManagement />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
