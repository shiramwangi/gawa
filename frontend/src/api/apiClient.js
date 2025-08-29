import { refreshToken } from './auth';

class ApiClient {
  constructor() {
    this.baseURL = 'http://localhost:8000';
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  // Process the queue of failed requests
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    this.failedQueue = [];
  }

  // Get access token from localStorage
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  // Get refresh token from localStorage
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  // Set tokens in localStorage
  setTokens(accessToken, refreshToken) {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // Clear all tokens and user data
  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  // Handle token refresh
  async handleTokenRefresh() {
    try {
      const refreshTokenValue = this.getRefreshToken();
      
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshTokenValue
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      // Update tokens
      this.setTokens(data.access_token, data.refresh_token);
      
      return data.access_token;
    } catch (error) {
      // Clear tokens and redirect to login
      this.clearTokens();
      window.location.href = '/login';
      throw error;
    }
  }

  // Make API request with automatic token refresh
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Add authorization header if token exists
    const accessToken = this.getAccessToken();
    if (accessToken) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
      };
    }

    try {
      const response = await fetch(url, options);
      
      // If unauthorized, try to refresh token
      if (response.status === 401 && this.getRefreshToken()) {
        if (this.isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(token => {
            options.headers = {
              ...options.headers,
              'Authorization': `Bearer ${token}`
            };
            return fetch(url, options);
          });
        }

        this.isRefreshing = true;

        try {
          const newToken = await this.handleTokenRefresh();
          this.processQueue(null, newToken);
          
          // Retry the original request with new token
          options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`
          };
          
          const retryResponse = await fetch(url, options);
          return retryResponse;
        } catch (error) {
          this.processQueue(error, null);
          throw error;
        } finally {
          this.isRefreshing = false;
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create and export a single instance
const apiClient = new ApiClient();
export default apiClient;
