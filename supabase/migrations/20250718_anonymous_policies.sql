-- Allow anonymous users to create blogs (for testing)
CREATE POLICY "Anonymous users can create blogs" ON blogs
  FOR INSERT WITH CHECK (user_id IS NULL);

-- Allow anonymous users to read their own blogs
CREATE POLICY "Anonymous users can view blogs without user_id" ON blogs
  FOR SELECT USING (user_id IS NULL);