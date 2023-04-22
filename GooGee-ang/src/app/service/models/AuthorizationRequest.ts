export interface AuthenticationRequest {
  accessToken: string;
  refreshToken: string;
  transactionTime: number;
  success: boolean;
}
