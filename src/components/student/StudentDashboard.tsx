
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BookOpen, Calendar, TrendingUp, Award, Clock, Play } from 'lucide-react';
import { ExamSummary, Exam, Result } from '../../types';

const StudentDashboard: React.FC = () => {
  const [examSummary] = useState<ExamSummary>({
    totalExams: 5,
    completedExams: 3,
    averageScore: 82,
    bestScore: 90,
    recentResults: [
      {
        id: '1',
        examId: '3',
        studentId: '2',
        marks: 42,
        totalMarks: 50,
        percentage: 84,
        grade: 'A',
        submittedAt: '2024-06-10T14:30:00'
      },
      {
        id: '2',
        examId: '2',
        studentId: '2',
        marks: 88,
        totalMarks: 100,
        percentage: 88,
        grade: 'A+',
        submittedAt: '2024-06-05T16:15:00'
      }
    ]
  });

  const [availableExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Mathematics Mid-term',
      subject: 'Mathematics',
      date: '2024-06-15',
      duration: 120,
      totalMarks: 100,
      description: 'Algebra and Geometry',
      status: 'upcoming',
      createdBy: 'admin'
    },
    {
      id: '2',
      title: 'Science Final Exam',
      subject: 'Science',
      date: '2024-06-20',
      duration: 180,
      totalMarks: 150,
      description: 'Physics, Chemistry, Biology',
      status: 'upcoming',
      createdBy: 'admin'
    }
  ]);

  const stats = [
    {
      title: 'Total Exams',
      value: examSummary.totalExams.toString(),
      icon: BookOpen,
      color: 'text-blue-600',
      description: 'Assigned to you'
    },
    {
      title: 'Completed',
      value: examSummary.completedExams.toString(),
      icon: Award,
      color: 'text-green-600',
      description: 'Successfully finished'
    },
    {
      title: 'Average Score',
      value: `${examSummary.averageScore}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      description: 'Overall performance'
    },
    {
      title: 'Best Score',
      value: `${examSummary.bestScore}%`,
      icon: Award,
      color: 'text-orange-600',
      description: 'Highest achievement'
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-green-100 text-green-700';
      case 'B+': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-blue-100">Track your exam progress and performance</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Available Exams
            </CardTitle>
            <CardDescription>Exams you can take now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableExams.map((exam) => (
                <div key={exam.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{exam.title}</h3>
                      <p className="text-sm text-gray-600">{exam.subject}</p>
                    </div>
                    <Badge className={getStatusColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    {exam.date}
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    {exam.duration} mins
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{exam.description}</p>
                  <Button size="sm" className="w-full">
                    <Play className="h-3 w-3 mr-1" />
                    Start Exam
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Results
            </CardTitle>
            <CardDescription>Your latest exam performances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examSummary.recentResults.map((result) => (
                <div key={result.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">Exam ID: {result.examId}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getGradeColor(result.grade)}>
                      {result.grade}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Score:</span>
                    <span className="font-medium">
                      {result.marks}/{result.totalMarks} ({result.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
              {examSummary.recentResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No results yet</p>
                  <p className="text-sm">Complete an exam to see your results here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Overview
          </CardTitle>
          <CardDescription>Your academic progress summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {examSummary.averageScore}%
              </div>
              <p className="text-blue-800 font-medium">Average Score</p>
              <p className="text-sm text-blue-600">Across all subjects</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {examSummary.completedExams}
              </div>
              <p className="text-green-800 font-medium">Completed Exams</p>
              <p className="text-sm text-green-600">Out of {examSummary.totalExams} total</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {examSummary.bestScore}%
              </div>
              <p className="text-purple-800 font-medium">Best Performance</p>
              <p className="text-sm text-purple-600">Keep up the good work!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
