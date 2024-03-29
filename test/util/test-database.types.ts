export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          created_at: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          id?: number;
        };
      };
      comments: {
        Row: {
          created_at: string;
          created_by: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
