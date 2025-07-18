-- Allow anonymous users to update blogs (for testing)
CREATE POLICY "Anonymous users can update blogs" ON blogs
  FOR UPDATE 
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);

-- Allow anonymous users to delete blogs (for testing) 
CREATE POLICY "Anonymous users can delete blogs" ON blogs
  FOR DELETE
  USING (user_id IS NULL);

-- Note: In production, you should restrict these operations to authenticated users
-- and only allow users to update/delete their own blogs