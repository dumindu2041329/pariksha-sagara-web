
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';
import { Result } from '../../types';

const ResultsManagement: React.FC = () => {
  const [results] = useState<Result[]>([
    {
      id: '1',
      examId: '3',
      studentId: '1',
      marks: 42,
      totalMarks: 50,
      percentage: 84,
      grade: 'A',
      submittedAt: '2024-06-10T14:30:00'
    },
    {
      id: '2',
      examId: '3',
      studentId: '2',
      marks: 38,
      totalMarks: 50,
      percentage: 76,
      grade: 'B+',
      submittedAt: '2024-06-10T14:25:00'
    },
    {
      id: '3',
      examId: '3',
      studentId: '3',
      marks: 45,
      totalMarks: 50,
      percentage: 90,
      grade: 'A+',
      submittedAt: '2024-06-10T14:20:00'
    }
  ]);

  const [selectedExam, setSelectedExam] = useState('all');

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

  const stats = [
    {
      title: 'Total Results',
      value: results.length.toString(),
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Average Score',
      value: `${Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)}%`,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Students Evaluated',
      value: new Set(results.map(r => r.studentId)).size.toString(),
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Exams Completed',
      value: new Set(results.map(r => r.examId)).size.toString(),
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Results Management</h2>
          <p className="text-gray-600">View and analyze exam results</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exams</SelectItem>
              <SelectItem value="1">Mathematics Mid-term</SelectItem>
              <SelectItem value="2">Science Final Exam</SelectItem>
              <SelectItem value="3">History Quiz</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Results</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
          <CardDescription>Latest exam results and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Student ID: {result.studentId}</p>
                    <p className="text-sm text-gray-600">Exam ID: {result.examId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{result.marks}/{result.totalMarks}</p>
                    <p className="text-sm text-gray-600">{result.percentage}%</p>
                  </div>
                  <Badge className={getGradeColor(result.grade)}>
                    {result.grade}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    {new Date(result.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsManagement;
