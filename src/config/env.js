// Единственное место, где читаются переменные окружения.
// Значения задаются в .env.local (локально) или в секретах GitHub (при деплое).
// См. .env.example.

export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
}

export const hasSupabase = Boolean(env.supabaseUrl && env.supabaseAnonKey)
