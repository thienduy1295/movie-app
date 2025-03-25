import axios from "axios";

const API_KEY = "935e07ca69489569f7c2f79bcad5cdfb";
const BASE_URL = "https://api.themoviedb.org/3";

export const SET_SESSION_ID = "SET_SESSION_ID";
export const SET_ACCOUNT_DETAILS = "SET_ACCOUNT_DETAILS";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const LOGOUT = "LOGOUT";

// Check if we have an existing session
export const checkSession = () => async (dispatch) => {
  const sessionId = localStorage.getItem('tmdb_session_id');
  if (sessionId) {
    try {
      // Validate session and get account details
      const accountResponse = await axios.get(
        `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
      );
      dispatch({ type: SET_SESSION_ID, payload: sessionId });
      dispatch({ type: SET_ACCOUNT_DETAILS, payload: accountResponse.data });
    } catch (error) {
      // If session is invalid, clear it
      localStorage.removeItem('tmdb_session_id');
      dispatch({ type: LOGOUT });
    }
  }
};

// Initiate login process
export const initiateLogin = () => async (dispatch) => {
  try {
    // First, get a request token
    const tokenResponse = await axios.get(
      `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
    const requestToken = tokenResponse.data.request_token;
    
    // Store request token for later use
    localStorage.setItem('tmdb_request_token', requestToken);
    
    // Redirect user to TMDB auth page
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/auth/callback`;
  } catch (error) {
    dispatch({ type: SET_AUTH_ERROR, payload: error.message });
    console.error("Authentication error:", error);
  }
};

// Handle auth callback
export const handleAuthCallback = () => async (dispatch) => {
  const requestToken = localStorage.getItem('tmdb_request_token');
  
  if (!requestToken) {
    dispatch({ type: SET_AUTH_ERROR, payload: "No request token found" });
    return;
  }

  try {
    // Create session with validated request token
    const sessionResponse = await axios.post(
      `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      { request_token: requestToken }
    );

    const sessionId = sessionResponse.data.session_id;
    localStorage.setItem('tmdb_session_id', sessionId);
    localStorage.removeItem('tmdb_request_token');
    
    dispatch({ type: SET_SESSION_ID, payload: sessionId });

    // Get account details
    const accountResponse = await axios.get(
      `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
    dispatch({ type: SET_ACCOUNT_DETAILS, payload: accountResponse.data });

    // Redirect to home page after successful login
    window.location.href = '/';
  } catch (error) {
    dispatch({ type: SET_AUTH_ERROR, payload: error.message });
    console.error("Authentication error:", error);
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    const { sessionId } = getState().auth;
    await axios.delete(
      `${BASE_URL}/authentication/session?api_key=${API_KEY}`,
      { data: { session_id: sessionId } }
    );
    localStorage.removeItem('tmdb_session_id');
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const addToWatchlist = (mediaId, mediaType, add) => async (dispatch, getState) => {
  try {
    const { sessionId, accountDetails } = getState().auth;
    await axios.post(
      `${BASE_URL}/account/${accountDetails.id}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: add,
      }
    );
  } catch (error) {
    console.error("Watchlist error:", error);
  }
};

export const addToFavorites = (mediaId, mediaType, add) => async (dispatch, getState) => {
  try {
    const { sessionId, accountDetails } = getState().auth;
    await axios.post(
      `${BASE_URL}/account/${accountDetails.id}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        media_type: mediaType,
        media_id: mediaId,
        favorite: add,
      }
    );
  } catch (error) {
    console.error("Favorites error:", error);
  }
}; 