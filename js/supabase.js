const SUPABASE_URL = "https://quytcvcwwuwibqzmrjtj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7Y-WGRM9fmcVnMwIp1dq6A_HJ4LHJzk";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
