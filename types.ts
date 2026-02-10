
export interface Profile {
  id: string;
  business_name: string;
  google_review_url: string;
  paddle_sub_status: string;
}

export interface FeedbackRequest {
  id: string;
  user_id: string;
  customer_name: string;
  status: 'pending' | 'clicked' | 'rated';
  rating?: number;
  feedback_text?: string;
  created_at: string;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
  } | null;
}
