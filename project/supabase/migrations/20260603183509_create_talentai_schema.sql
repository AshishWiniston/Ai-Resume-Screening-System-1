/*
  # TalentAI Database Schema

  ## Overview
  Creates the complete data model for the AI Resume Screening & Candidate Ranking platform.

  ## New Tables

  ### 1. `profiles`
  - Extends auth.users with recruiter-specific fields
  - Columns: id (auth ref), full_name, role, phone, company, job_title, avatar_url, created_at

  ### 2. `candidates`
  - Stores parsed candidate information from resumes
  - Columns: id, name, email, phone, experience_years, education, skills (jsonb), raw_text, created_by, created_at

  ### 3. `resumes`
  - Tracks uploaded resume files and their processing state
  - Columns: id, candidate_id, file_name, file_url, status, created_by, created_at

  ### 4. `job_descriptions`
  - Job postings created by recruiters
  - Columns: id, title, department, description, required_skills (jsonb), status, created_by, created_at

  ### 5. `candidate_scores`
  - AI analysis scores linking candidates to job descriptions
  - Columns: id, candidate_id, job_id, overall_score, skill_match, experience_match, strengths (jsonb), weaknesses (jsonb), recommendation, created_at

  ### 6. `notifications`
  - In-app notification system
  - Columns: id, user_id, type, title, message, read, created_at

  ## Security
  - RLS enabled on all tables
  - Recruiters can only access their own data
  - Service role has full access for AI processing
*/

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  role text DEFAULT 'Recruiter',
  phone text DEFAULT '',
  company text DEFAULT '',
  job_title text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  experience_years integer DEFAULT 0,
  education text DEFAULT '',
  skills jsonb DEFAULT '[]',
  raw_text text DEFAULT '',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view candidates they created"
  ON candidates FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Recruiters can insert candidates"
  ON candidates FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recruiters can update their candidates"
  ON candidates FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recruiters can delete their candidates"
  ON candidates FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  file_name text NOT NULL DEFAULT '',
  file_url text DEFAULT '',
  status text DEFAULT 'pending',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view own resumes"
  ON resumes FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Recruiters can insert resumes"
  ON resumes FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recruiters can update own resumes"
  ON resumes FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recruiters can delete own resumes"
  ON resumes FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Job descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  department text DEFAULT '',
  description text DEFAULT '',
  required_skills jsonb DEFAULT '[]',
  status text DEFAULT 'Active',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view own job descriptions"
  ON job_descriptions FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Recruiters can insert job descriptions"
  ON job_descriptions FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recruiters can update own job descriptions"
  ON job_descriptions FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Recruiters can delete own job descriptions"
  ON job_descriptions FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Candidate scores table (AI analysis results)
CREATE TABLE IF NOT EXISTS candidate_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  job_id uuid REFERENCES job_descriptions(id) ON DELETE CASCADE,
  overall_score integer DEFAULT 0,
  skill_match integer DEFAULT 0,
  experience_match integer DEFAULT 0,
  strengths jsonb DEFAULT '[]',
  weaknesses jsonb DEFAULT '[]',
  recommendation text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE candidate_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view scores for their candidates"
  ON candidate_scores FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM candidates c
      WHERE c.id = candidate_scores.candidate_id
      AND c.created_by = auth.uid()
    )
  );

CREATE POLICY "Recruiters can insert candidate scores"
  ON candidate_scores FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM candidates c
      WHERE c.id = candidate_scores.candidate_id
      AND c.created_by = auth.uid()
    )
  );

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text DEFAULT 'info',
  title text NOT NULL DEFAULT '',
  message text DEFAULT '',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_candidates_created_by ON candidates(created_by);
CREATE INDEX IF NOT EXISTS idx_resumes_created_by ON resumes(created_by);
CREATE INDEX IF NOT EXISTS idx_resumes_candidate_id ON resumes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_job_descriptions_created_by ON job_descriptions(created_by);
CREATE INDEX IF NOT EXISTS idx_candidate_scores_candidate_id ON candidate_scores(candidate_id);
CREATE INDEX IF NOT EXISTS idx_candidate_scores_job_id ON candidate_scores(job_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
