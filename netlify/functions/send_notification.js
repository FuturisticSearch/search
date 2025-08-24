import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function handler(event) {
  const { title, body } = JSON.parse(event.body);

  // Load tokens from a local JSON file (for testing) or your DB
  const tokens = require("./tokens.json"); // array of FCM tokens

  const message = {
    notification: { title, body },
    tokens,
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: response.successCount, failure: response.failureCount }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
}
