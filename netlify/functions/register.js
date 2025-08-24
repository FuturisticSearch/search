import { writeFileSync, existsSync, readFileSync } from "fs";
import path from "path";

export async function handler(event) {
  const { token } = JSON.parse(event.body);

  // Store tokens in a JSON file (simple for testing)
  const filePath = path.join(__dirname, "tokens.json");
  let tokens = [];
  if (existsSync(filePath)) {
    tokens = JSON.parse(readFileSync(filePath));
  }
  if (!tokens.includes(token)) tokens.push(token);

  writeFileSync(filePath, JSON.stringify(tokens));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Token registered!" })
  };
}
