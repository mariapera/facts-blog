import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jawpjktrgwztevaknjwu.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphd3Bqa3RyZ3d6dGV2YWtuand1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0Mzg2ODQsImV4cCI6MjAyNDAxNDY4NH0.6Bnnbe42US0Sji8eIix9K7FeoLkpUDUd5vXNVmMCyoY'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
