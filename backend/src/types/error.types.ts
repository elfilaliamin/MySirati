export interface ApiErrorDetail {
  readonly field?: string;
  readonly message: string;
}

export interface ApiErrorPayload {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: readonly ApiErrorDetail[];
  };
}
