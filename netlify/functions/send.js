import fetch from "node-fetch";
let tokens = []; // Use same array or a database in production
const SERVER_KEY = "YOUR_FIREBASE_SERVER_KEY";

export async function handler(event) {
  const { title, body } = JSON.parse(event.body);

  for (const token of tokens) {
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Authorization": `key=${SERVER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: token,
        notification: { title, body }
      })
    });
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
}
