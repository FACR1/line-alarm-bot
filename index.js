const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const admin = require("firebase-admin");

// ✅ แปลงค่า Base64 ของ Firebase service account
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let serviceAccount;

try {
  // แปลง Base64 กลับเป็น JSON
  const serviceAccountJson = Buffer.from(serviceAccountBase64, "base64").toString("utf8");

  // ตรวจสอบว่าเป็น JSON ที่ถูกต้อง
  serviceAccount = JSON.parse(serviceAccountJson);

  // ✅ Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app",
  });

  console.log("✅ Firebase initialized successfully.");
} catch (error) {
  console.error("❌ Error loading Firebase service account:", error.message);
  process.exit(1);  // ออกจากโปรแกรมเมื่อเกิดข้อผิดพลาด
}

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const LINE_GROUP_ID = process.env.LINE_GROUP_ID;
const db = admin.database();
const ref = db.ref("/alarm_data");

const sentMessages = {};

// ✅ ส่งข้อความ LINE
async function sendLineMessage(message, inputName, status, line_message) {
  try {
    const response = await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: LINE_GROUP_ID,
        messages: [
          {
            type: "text",
            text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
      }
    );

    console.log(`[${new Date().toISOString()}] ✅ Message sent to LINE`);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("❌ Error sending message:", error.response?.data || error.message);
  }
}

// ✅ ตรวจจับการเปลี่ยนแปลงใน Firebase
ref.on("child_changed", async (snapshot) => {
  const inputName = snapshot.key;
  const inputData = snapshot.val();

  if (!inputData) return;

  const timestamps = Object.keys(inputData);
  const latestTimestamp = timestamps[timestamps.length - 1];
  const latestData = inputData[latestTimestamp];

  const { status, line_message } = latestData;
  if (!status || !line_message) return;

  console.log(`[${new Date().toISOString()}] 📡 Data changed for ${inputName}:`, latestData);

  setTimeout(async () => {
    try {
      const latestSnapshot = await snapshot.ref.once("value");
      const confirmedData = latestSnapshot.val();

      if (!confirmedData) return;

      const confirmedTimestamps = Object.keys(confirmedData);
      const confirmedLatestTimestamp = confirmedTimestamps[confirmedTimestamps.length - 1];
      const confirmedLatestData = confirmedData[confirmedLatestTimestamp];

      const confirmedStatus = confirmedLatestData.status;

      if (confirmedStatus === status) {
        if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
          sendLineMessage(line_message, inputName, status, line_message);
          sentMessages[inputName] = "Alarm";
        } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
          sendLineMessage(line_message, inputName, status, line_message);
          sentMessages[inputName] = "Clear";
        } else if (status === "normal") {
          sentMessages[inputName] = false;
        }
      } else {
        console.log(`⚠️ Status changed during confirmation. Skipping LINE send for ${inputName}.`);
      }
    } catch (error) {
      console.error("❌ Error during status confirmation:", error.message);
    }
  }, 2000);
});

// ✅ LINE Webhook
app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  if (events && events.length > 0) {
    for (const event of events) {
      if (event.type === "message" && event.message.type === "text" && event.source.type === "group") {
        const groupId = event.source.groupId;
        const userMessage = event.message.text;
        const replyToken = event.replyToken;

        console.log(`📥 Message from group: ${groupId}`);
        console.log(`💬 Text: ${userMessage}`);
        console.log(`👉 Copy this GROUP ID to your .env file as LINE_GROUP_ID=${groupId}`);

        try {
          await axios.post(
            "https://api.line.me/v2/bot/message/reply",
            {
              replyToken: replyToken,
              messages: [
                {
                  type: "text",
                  text: `📡 รับข้อความของคุณแล้ว: "${userMessage}"`,
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
              },
            }
          );
          console.log("✅ Reply message sent.");
        } catch (err) {
          console.error("❌ Error replying to message:", err.response?.data || err.message);
        }
      }
    }
  }

  res.status(200).send("OK");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
