import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Environment variables for Vite
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";
// const API_TIMEOUT = 10000;

// Create axios instance with default configuration
const APIInterceptor: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
APIInterceptor.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add authorization token if available
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add custom headers for tracking
    if (config.headers) {
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      config.headers["X-Client-Version"] = "1.0.0";
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Log request errors in development
    if (import.meta.env.DEV) {
      console.error("Request Interceptor Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response Interceptor
APIInterceptor.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Return successful responses as-is
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response) {
      const { status } = error.response;

      // Handle 401 Unauthorized
      if (status === 401 && !originalRequest._retry) {
        // Attempt token refresh or redirect to login
        handleUnauthorized();
        return Promise.reject(error);
      }

      // Handle other HTTP errors
      handleHttpError(status, error.response.data);
    } else if (error.request) {
      // Network error
      handleNetworkError();
    }

    return Promise.reject(error);
  }
);

// Helper functions
function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

function handleUnauthorized(): void {
  // Clear invalid token
  localStorage.removeItem("authToken");

  // Redirect to login page (adjust route as needed)
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

function handleHttpError(status: number, data: any): void {
  let message = "An unexpected error occurred";

  switch (status) {
    case 400:
      message = "Bad Request: Please check your input";
      break;
    case 403:
      message = "Forbidden: Access denied";
      break;
    case 404:
      message = "Not Found: Resource not available";
      break;
    case 422:
      message = "Validation Error: Please check your data";
      break;
    case 500:
      message = "Server Error: Please try again later";
      break;
    default:
      if (data?.message) {
        message = data.message;
      }
  }

  // In a real app, you might dispatch to a global error handler or toast system
  if (import.meta.env.DEV) {
    console.error(`HTTP ${status}:`, message);
  }
}

function handleNetworkError(): void {
  const message = "Network Error: Please check your connection";

  if (import.meta.env.DEV) {
    console.error(message);
  }
}

export default APIInterceptor;

// Export additional utilities if needed
export { APIInterceptor };
