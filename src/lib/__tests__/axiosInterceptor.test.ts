import axios from 'axios';
import { APIInterceptor, setLogoutHandler } from '../axiosInterceptor';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('APIInterceptor', () => {
  let logoutHandler: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    logoutHandler = jest.fn();
    setLogoutHandler(logoutHandler);
  });

  describe('Request Interceptor', () => {
    it('adds authorization header when token exists', () => {
      localStorageMock.getItem.mockReturnValue('test-token');

      const config = {
        headers: {},
      };

      const result = APIInterceptor.interceptors.request.handlers[0].fulfilled(config);

      expect(result.headers.Authorization).toBe('Bearer test-token');
      expect(result.headers['X-Requested-With']).toBe('XMLHttpRequest');
    });

    it('does not add authorization header when no token', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const config = {
        headers: {},
      };

      const result = APIInterceptor.interceptors.request.handlers[0].fulfilled(config);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    it('returns successful response unchanged', async () => {
      const response = { data: 'success' };

      const result = await APIInterceptor.interceptors.response.handlers[0].fulfilled(response);

      expect(result).toBe(response);
    });

    it('handles 401 with token refresh success', async () => {
      localStorageMock.getItem
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      mockedAxios.post.mockResolvedValue({
        data: { accessToken: 'new-access-token' },
      });

      const error = {
        response: { status: 401 },
        config: { headers: {} },
      };

      const result = await APIInterceptor.interceptors.response.handlers[0].rejected(error);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/refresh'),
        { refreshToken: 'refresh-token' }
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'new-access-token');
    });

    it('handles 401 with refresh failure and calls logout handler', async () => {
      localStorageMock.getItem.mockReturnValue('refresh-token');
      mockedAxios.post.mockRejectedValue(new Error('Refresh failed'));

      const error = {
        response: { status: 401 },
        config: { headers: {} },
      };

      await expect(
        APIInterceptor.interceptors.response.handlers[0].rejected(error)
      ).rejects.toThrow('Refresh failed');

      expect(logoutHandler).toHaveBeenCalled();
    });

    it('handles network errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const error = {
        request: {},
        config: {},
      };

      await expect(
        APIInterceptor.interceptors.response.handlers[0].rejected(error)
      ).rejects.toBe(error);

      expect(consoleSpy).toHaveBeenCalledWith('Network Error: Please check your connection');
      consoleSpy.mockRestore();
    });

    it('handles HTTP errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
        config: {},
      };

      await expect(
        APIInterceptor.interceptors.response.handlers[0].rejected(error)
      ).rejects.toBe(error);

      expect(consoleSpy).toHaveBeenCalledWith('HTTP 404: Not Found: Resource not available');
      consoleSpy.mockRestore();
    });
  });
});