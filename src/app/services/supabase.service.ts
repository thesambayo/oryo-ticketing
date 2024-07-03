import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  constructor() { }
}
