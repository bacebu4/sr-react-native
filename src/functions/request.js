export default async function request(url, method = "GET", token, data = null) {
  try {
    const headers = {};
    if (token) {
      headers["auth-token"] = token;
    }
    let body = null;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
