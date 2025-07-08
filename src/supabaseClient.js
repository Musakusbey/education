import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apsvtdhnjmkjgtnlzhkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwc3Z0ZGhuam1ramd0bmx6aGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzUxNDAsImV4cCI6MjA2NzU1MTE0MH0.tSMO_TvkIRPvlOKJiZ0mCemDLkgSyvCrjlPnVB-DRkw';

export const supabase = createClient(supabaseUrl, supabaseKey);   