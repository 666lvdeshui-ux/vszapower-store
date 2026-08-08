// Shared in-memory traffic logs storage as fallback / instant cache
export const inMemoryTrafficLogs: Array<{
  id: string;
  session_id: string;
  path: string;
  referrer: string;
  first_visit_source: string;
  country: string;
  language: string;
  user_agent: string;
  created_at: string;
}> = [];
