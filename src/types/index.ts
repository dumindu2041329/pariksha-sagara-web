
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: number; // in minutes
  totalMarks: number;
  description?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdBy: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  enrollmentDate: string;
  avatar?: string;
}

export interface Result {
  id: string;
  examId: string;
  studentId: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  submittedAt: string;
}

export interface ExamSummary {
  totalExams: number;
  completedExams: number;
  averageScore: number;
  bestScore: number;
  recentResults: Result[];
}
