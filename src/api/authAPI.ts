import { SignupMsg, LoginMsg, TokenResponse, LoginResponse, AutoTokenValidationResponse } from './types/authAPI';
import authApiInstance from './instances/authenticatedApi';
import apiInstance from './instances/defaultApi';

// Auth API
export const signupWithEmailRequest = (creds: SignupMsg, recaptchaToken?: string) => apiInstance.post<TokenResponse>('/v1/auth/signup-with-email', creds, recaptchaToken ? {
  headers: {
    'Recaptcha-Token': recaptchaToken
  }
} : undefined);
export const loginWithEmailRequest = (creds: LoginMsg) => apiInstance.post<LoginResponse>('/v1/auth/login-with-email', creds);

export const resend2FAVerificationCodeRequest = (creds: LoginMsg) => apiInstance.post('/v1/auth/resend-verification-code', creds);

export const autoValidateTemporaryTokenReq = (token: string, accessToken: string) => apiInstance.post<AutoTokenValidationResponse>('/v1/auth/get-verification-code-with-token', { tempToken: token, accessToken });
export const renewTokenURL = '/v1/auth/renew-token';
export const renewTokenReq = (refreshToken: string) => authApiInstance.post<TokenResponse>(renewTokenURL, { refreshToken: refreshToken });
