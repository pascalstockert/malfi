import { Injectable } from '@angular/core';
import { AuthError, createClient, OAuthResponse, Session, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseHost, environment.supabaseKey);
  }

  public async getCurrentSession(): Promise<Session | null> {
    const sessionResponse = await this.supabaseClient.auth.getSession();

    if (sessionResponse.error || !sessionResponse.data.session) {
      return null;
    }

    return sessionResponse.data.session;
  }

  public async getCurrentUser(): Promise<UserResponse> {
    return this.supabaseClient.auth.getUser();
  }

  public async signInWithGoogle(): Promise<OAuthResponse> {
    return this.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  public async signOut(): Promise<{error: AuthError | null}> {
    return this.supabaseClient.auth.signOut();
  }
}
