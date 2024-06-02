import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// supabase.ts

// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// const supabaseUrl: string = "https://jzjlakfxpvedgligtvyp.supabase.co";
// const supabaseKey: string =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6amxha2Z4cHZlZGdsaWd0dnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNDk5MDYsImV4cCI6MjAyNzgyNTkwNn0.u565XMRoDOwVFBn5aKV5YaMAuP8BcPDVV_8eNJMy-4M";

// export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
