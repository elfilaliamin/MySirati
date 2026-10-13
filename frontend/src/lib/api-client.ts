export class ApiClientError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestOptions extends RequestInit {
  data?: unknown;
}

const parseErrorResponse = async (response: Response): Promise<ApiClientError> => {
  try {
    const errorJson = await response.json();
    return new ApiClientError(
      response.status,
      errorJson.message || `Request failed with status ${response.status}`,
      errorJson.errors
    );
  } catch {
    return new ApiClientError(
      response.status,
      `Network request failed with status ${response.status}`
    );
  }
};

export const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { data, headers, ...customConfig } = options;
  const config: RequestInit = {
    ...customConfig,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, config);

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  if (response.status === 204) {
    return null as unknown as T;
  }

  return response.json();
};
