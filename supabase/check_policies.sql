-- Check existing policies on blogs table
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'blogs';

-- If needed, drop existing policies and recreate
-- DROP POLICY IF EXISTS "Anonymous users can create blogs" ON blogs;
-- DROP POLICY IF EXISTS "Anonymous users can view blogs without user_id" ON blogs;
-- DROP POLICY IF EXISTS "Anonymous users can update blogs" ON blogs;
-- DROP POLICY IF EXISTS "Anonymous users can delete blogs" ON blogs;

-- Create comprehensive policies for anonymous users (testing)
CREATE POLICY "Enable all operations for anonymous users" ON blogs
  FOR ALL 
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);