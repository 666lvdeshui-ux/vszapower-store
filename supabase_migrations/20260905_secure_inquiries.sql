-- Apply only after SUPABASE_SERVICE_ROLE_KEY is configured in Vercel.
-- Public visitors submit inquiries through /api/inquiries; the route uses the
-- server-only Service Role client. No browser should read inquiry records directly.

DROP POLICY IF EXISTS "Allow public read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public insert inquiries" ON public.inquiries;

-- RLS remains enabled. The Service Role bypasses RLS for the protected server API.
-- Also remove the broad policy found during the 2026-09-06 read-only audit.
DROP POLICY IF EXISTS "Allow all inquiries" ON public.inquiries;
