export interface User {
  id: string;
  email: string;
  full_name: string;
  mobile_number: string;
  role: 'student' | 'admin';
  created_at: string;
}

export interface Admission {
  id: string;
  user_id: string;
  name: string;
  age: number;
  contact_number: string;
  full_address: string;
  email: string;
  course_name: string;
  father_name: string;
  father_contact: string;
  duration: 1 | 3 | 6;
  selected_shifts: string[];
  registration_fee: number;
  shift_fee: number;
  total_amount: number;
  payment_status: 'pending' | 'paid';
  payment_date?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

export interface SeatBooking {
  id: string;
  user_id: string;
  shift: 'morning' | 'noon' | 'evening' | 'night';
  seat_number: string;
  booking_status: 'booked' | 'available';
  booking_date: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  shift: string;
  check_in_time?: string;
  check_out_time?: string;
  date: string;
  created_at: string;
}

export interface StudySchedule {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  start_time: string;
  end_time: string;
  date: string;
  reminder_enabled: boolean;
  created_at: string;
}

export interface PaymentHistory {
  id: string;
  user_id: string;
  amount: number;
  payment_mode: 'upi' | 'cash';
  duration_months: number;
  payment_date: string;
  receipt_number: string;
  created_at: string;
}

export interface HelpRequest {
  id: string;
  user_id: string;
  category: 'seat_issue' | 'payment_issue' | 'technical_issue';
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  admin_response?: string;
  created_at: string;
}