import fetch from "node-fetch";

let accessToken = process.env.ACCESS_TOKEN;
let tokenExpiry = process.env.TOKEN_EXPIRY;

async function refreshAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token.");
  }

  const data = await response.json();

  // Perbarui token dan masa berlaku
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;

  return accessToken;
}

async function getAccessToken() {
  if (!accessToken || Date.now() >= tokenExpiry) {
    return await refreshAccessToken();
  }
  return accessToken;
}

export { getAccessToken };
