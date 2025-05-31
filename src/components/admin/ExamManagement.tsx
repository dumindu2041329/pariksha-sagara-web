
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Plus, Calendar, Clock, Users, Edit, Trash2 } from 'lucide-react';
import { Exam } from '../../types';

const ExamManagement: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
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
    },
    {
      id: '3',
      title: 'History Quiz',
      subject: 'History',
      date: '2024-06-10',
      duration: 60,
      totalMarks: 50,
      description: 'World War II',
      status: 'completed',
      createdBy: 'admin'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    date: '',
    duration: '',
    totalMarks: '',
    description: ''
  });

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    const exam: Exam = {
      id: Date.now().toString(),
      title: newExam.title,
      subject: newExam.subject,
      date: newExam.date,
      duration: parseInt(newExam.duration),
      totalMarks: parseInt(newExam.totalMarks),
      description: newExam.description,
      status: 'upcoming',
      createdBy: 'admin'
    };
    
    setExams([...exams, exam]);
    setNewExam({
      title: '',
      subject: '',
      date: '',
      duration: '',
      totalMarks: '',
      description: ''
    });
    setShowCreateForm(false);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Exam Management</h2>
          <p className="text-gray-600">Create and manage examinations</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Exam
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Exam</CardTitle>
            <CardDescription>Fill in the exam details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateExam} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Exam Title</Label>
                  <Input
                    id="title"
                    value={newExam.title}
                    onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                    placeholder="Enter exam title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newExam.subject}
                    onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExam.date}
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newExam.duration}
                    onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
                    placeholder="120"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={newExam.totalMarks}
                    onChange={(e) => setNewExam({...newExam, totalMarks: e.target.value})}
                    placeholder="100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExam.description}
                    onChange={(e) => setNewExam({...newExam, description: e.target.value})}
                    placeholder="Exam description"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">Create Exam</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                  <CardDescription>{exam.subject}</CardDescription>
                </div>
                <Badge className={getStatusColor(exam.status)}>
                  {exam.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {exam.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {exam.duration} minutes
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {exam.totalMarks} marks
                </div>
                {exam.description && (
                  <p className="text-sm text-gray-600">{exam.description}</p>
                )}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamManagement;
