// CORS Proxy Service
// This service helps bypass CORS restrictions when calling external APIs

// List of CORS proxy services
const CORS_PROXIES = [
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://thingproxy.freeboard.io/fetch/',
  'https://cors.bridged.cc/'
];

// Function to get a working CORS proxy
async function getWorkingProxy() {
  for (const proxy of CORS_PROXIES) {
    try {
      const testResponse = await fetch(`${proxy}https://httpbin.org/get`, {
        method: 'GET',
        timeout: 5000
      });
      if (testResponse.ok) {
        console.log(`✅ Working CORS proxy found: ${proxy}`);
        return proxy;
      }
    } catch (error) {
      console.log(`❌ Proxy failed: ${proxy}`, error.message);
      continue;
    }
  }
  console.log('⚠️ No working CORS proxy found, using mock data');
  return null;
}

// Function to make CORS-free API calls
export async function makeCorsFreeRequest(url, options = {}) {
  try {
    // First try direct request (in case CORS is not an issue)
    try {
      const directResponse = await fetch(url, options);
      if (directResponse.ok) {
        console.log('✅ Direct API call successful');
        return directResponse;
      }
    } catch (directError) {
      console.log('⚠️ Direct API call failed, trying CORS proxy...');
    }

    // If direct request fails, try CORS proxy
    const workingProxy = await getWorkingProxy();
    if (workingProxy) {
      const proxyUrl = `${workingProxy}${url}`;
      console.log(`🔄 Making request through CORS proxy: ${proxyUrl}`);
      
      const proxyResponse = await fetch(proxyUrl, {
        ...options,
        headers: {
          ...options.headers,
          'Origin': window.location.origin,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (proxyResponse.ok) {
        console.log('✅ CORS proxy request successful');
        return proxyResponse;
      } else {
        console.log(`❌ CORS proxy request failed: ${proxyResponse.status}`);
      }
    }
    
    throw new Error('No working CORS solution found');
  } catch (error) {
    console.error('❌ CORS-free request failed:', error);
    throw error;
  }
}

// Alternative: Use a backend proxy endpoint
export async function makeBackendProxyRequest(endpoint, data = {}) {
  try {
    // This would call your own backend endpoint that makes the external API call
    // For now, we'll simulate this with a mock response
    console.log('🔄 Simulating backend proxy request...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data for now
    return {
      ok: true,
      json: async () => ({ message: 'Backend proxy not implemented yet' })
    };
  } catch (error) {
    console.error('❌ Backend proxy request failed:', error);
    throw error;
  }
}

// Function to check if CORS is supported
export function isCorsSupported() {
  return 'cors' in new Request('', { mode: 'cors' });
}

// Function to get CORS status
export async function getCorsStatus(url) {
  try {
    const response = await fetch(url, { mode: 'cors' });
    return {
      supported: true,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      supported: false,
      error: error.message
    };
  }
}

export default {
  makeCorsFreeRequest,
  makeBackendProxyRequest,
  isCorsSupported,
  getCorsStatus
};
