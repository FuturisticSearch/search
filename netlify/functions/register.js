let tokens = []; // For production, save in a DB

export async function handler(event) {
  const { token } = JSON.parse(event.body);
  if (token && !tokens.includes(token)) tokens.push(token);
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
}
