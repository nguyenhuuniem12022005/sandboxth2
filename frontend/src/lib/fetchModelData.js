/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 */
const API_BASE = (process.env.REACT_APP_API_URL || "https://3cqttk-8081.csb.app").replace(/\/$/, "");

async function fetchModel(url) {
  const path = url.startsWith("/") ? url : `/${url}`;
  const response = await fetch(`${API_BASE}${path}`);

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON from server.");
  }
}

export default fetchModel;
