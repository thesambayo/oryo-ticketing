export interface LoginPayload {
    // with validation for BE
    email: string; // non empty and is an email
    password: string; // non empty
  }