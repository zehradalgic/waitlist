import { createClient } from '@supabase/supabase-js';

// Bu iki bilgi senin "veri tabanı anahtarların". 
// Birazdan Supabase sitesinden bunları alıp buraya yapıştıracağız.
const supabaseUrl = 'https://sglavvkbgquislrskoms.supabase.co';
const supabaseAnonKey = 'sb_publishable_s67M4cy_0-qtphmufnhUJg_gxpkOrkc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);