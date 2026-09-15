// supabase-config.js — Configuration Supabase
// La clé publishable est PUBLIQUE (visible côté navigateur, c'est normal)
// La sécurité se fait via les Row Level Security (RLS) côté Supabase

const SUPABASE_URL = 'https://sbrblcnppdfvezeqletb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uaoXtGEKyKIUUskf7NSjhA_UXgGtDad';

// Client global — disponible partout via window.supabaseClient
let supabaseClient = null;

function initSupabase() {
  if (supabaseClient) return supabaseClient;
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.warn('supabase-js pas chargé');
    return null;
  }
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  return supabaseClient;
}

// Test rapide de connexion (à appeler en console pour vérifier)
async function testSupabase() {
  const client = initSupabase();
  if (!client) return console.error('❌ Client non initialisé');

  const { data, error } = await client
    .from('_test_connection')
    .select('*')
    .limit(1);

  // Table inexistante → erreur 42P01 = OK, la connexion fonctionne
  if (error && (error.code === '42P01' || error.code === 'PGRST205')) {
    console.log('✅ Supabase connecté (table test absente, normal)');
    return true;
  }
  if (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  }
  console.log('✅ Supabase connecté, données:', data);
  return true;
}

// Test auth (au chargement sur chaque page)
async function testAuthConnection() {
  const client = initSupabase();
  if (!client) return null;

  const { data: { session }, error } = await client.auth.getSession();
  if (error) {
    console.warn('Auth:', error.message);
    return null;
  }
  if (session) {
    console.log('👤 Utilisateur connecté:', session.user.email);
    return session.user;
  }
  console.log('👤 Aucune session active');
  return null;
}
