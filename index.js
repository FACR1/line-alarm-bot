// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config(); // โหลดข้อมูลจากไฟล์ .env

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");

// // เชื่อมต่อ Firebase โดยใช้ Service Account Key
// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// // โหลดข้อมูลจาก .env
// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const USER_ID = process.env.USER_ID;

// // Firebase reference
// const db = admin.database();
// const ref = db.ref("/alarm_data");

// // เก็บสถานะที่ส่งข้อความไปแล้ว
// const sentMessages = {};

// // ฟังก์ชันสำหรับส่งข้อความ LINE
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", {
//       to: USER_ID,
//       messages: [
//         {
//           type: "text",
//           text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] Message sent to LINE:
//       input: ${inputName}, status: ${status}, message: ${line_message}`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// }

// // Listener สำหรับการเปลี่ยนแปลงข้อมูลใน Firebase
// ref.on("child_changed", (snapshot) => {
//   const inputData = snapshot.val();
//   const inputName = snapshot.key;

//   // คัดกรองข้อมูลที่มี `timestamp` ล่าสุด
//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1]; // หาคีย์ที่มี timestamp ล่าสุด
//   const latestData = inputData[latestTimestamp];  // ดึงข้อมูลจาก timestamp ล่าสุด

//   const { status, line_message } = latestData;

//   console.log(`[${new Date().toISOString()}] Data changed for ${inputName}:`, latestData);

//   // ตรวจสอบสถานะที่เปลี่ยนแปลงและไม่เคยส่งข้อความมาก่อน
//   if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Alarm"; // Mark as Alarm sent
//   } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Clear"; // Mark as Clear sent
//   } else if (status === "normal") {
//     sentMessages[inputName] = false; // Reset the sent status for normal
//   }
// });

// // เริ่มรัน Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// //////////////// ใช้งานส่งข้อความได้แล่ว /////////////////////////////


// //////////////////////////////////////

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config(); // โหลดข้อมูลจากไฟล์ .env

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");

// // เชื่อมต่อ Firebase โดยใช้ Service Account Key
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// // โหลดข้อมูลจาก .env
// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const USER_ID = process.env.USER_ID;

// // Firebase reference
// const db = admin.database();
// const ref = db.ref("/alarm_data");

// // เก็บสถานะที่ส่งข้อความไปแล้ว
// const sentMessages = {};

// // ฟังก์ชันสำหรับส่งข้อความ LINE
// async function sendLineMessage(message, inputName, status, line_message, groupId = null) {
//   const replyText = `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`;

//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", {
//       to: groupId || USER_ID, // ถ้ามี groupId ให้ส่งไปที่ group, ถ้าไม่มีก็ส่งไป user ส่วนตัว
//       messages: [
//         {
//           type: "text",
//           text: replyText
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] ✅ LINE Message Sent`);
//     console.log(`📤 Reply message: ${replyText}`);
//     if (groupId) {
//       console.log(`👥 Group ID: ${groupId}`);
//     } else {
//       console.log(`👤 Sent to USER_ID: ${USER_ID}`);
//     }
//     console.log("🛰️ Response from LINE API:", response.data);
//   } catch (error) {
//     console.error("❌ Error sending message:", error.response?.data || error.message);
//   }
// }

// // Listener สำหรับการเปลี่ยนแปลงข้อมูลใน Firebase
// ref.on("child_changed", (snapshot) => {
//   const inputData = snapshot.val();
//   const inputName = snapshot.key;

//   // คัดกรองข้อมูลที่มี `timestamp` ล่าสุด
//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1]; // หาคีย์ที่มี timestamp ล่าสุด
//   const latestData = inputData[latestTimestamp];  // ดึงข้อมูลจาก timestamp ล่าสุด

//   const { status, line_message, groupId } = latestData; // รองรับ groupId ที่ส่งมาด้วย

//   console.log(`[${new Date().toISOString()}] 🔄 Data changed for ${inputName}:`, latestData);

//   // ตรวจสอบสถานะที่เปลี่ยนแปลงและไม่เคยส่งข้อความมาก่อน
//   if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message, groupId);
//     sentMessages[inputName] = "Alarm";
//   } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message, groupId);
//     sentMessages[inputName] = "Clear";
//   } else if (status === "normal") {
//     sentMessages[inputName] = false;
//   }
// });

// // เริ่มรัน Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

/////////////// Webhoo //////////////////////////

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const USER_ID = process.env.USER_ID;

// const db = admin.database();
// const ref = db.ref("/alarm_data");

// const sentMessages = {};

// // 🔔 ฟังก์ชันส่งข้อความผ่าน push
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", {
//       to: USER_ID,
//       messages: [
//         {
//           type: "text",
//           text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] Message sent to LINE:
//       input: ${inputName}, status: ${status}, message: ${line_message}`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error sending message:", error.response?.data || error.message);
//   }
// }

// // 🔁 Listener จาก Firebase
// ref.on("child_changed", (snapshot) => {
//   const inputData = snapshot.val();
//   const inputName = snapshot.key;

//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1];
//   const latestData = inputData[latestTimestamp];

//   const { status, line_message } = latestData;

//   console.log(`[${new Date().toISOString()}] Data changed for ${inputName}:`, latestData);

//   if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Alarm";
//   } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Clear";
//   } else if (status === "normal") {
//     sentMessages[inputName] = false;
//   }
// });

// // 📡 Webhook รับข้อความจาก LINE
// app.post("/webhook", async (req, res) => {
//   const events = req.body.events;

//   for (const event of events) {
//     const replyToken = event.replyToken;
//     const messageText = event.message?.text;
//     const source = event.source;

//     // แสดง groupId อัตโนมัติ
//     if (source.type === "group") {
//       console.log("📌 Group ID:", source.groupId);
//     }

//     // ตอบกลับข้อความ (เฉพาะกรณีมีข้อความ)
//     if (replyToken && messageText) {
//       try {
//         await axios.post("https://api.line.me/v2/bot/message/reply", {
//           replyToken: replyToken,
//           messages: [
//             {
//               type: "text",
//               text: `✅ คุณพิมพ์ว่า: ${messageText}`
//             }
//           ]
//         }, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//           }
//         });
//       } catch (err) {
//         console.error("❌ Error sending reply:", err.response?.data || err.message);
//       }
//     }
//   }

//   res.sendStatus(200);
// });

// // 🌐 เริ่ม Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

////////////////// reply token /////////////////////////

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config(); // โหลดข้อมูลจากไฟล์ .env

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");

// // เชื่อมต่อ Firebase โดยใช้ Service Account Key
// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// // โหลดข้อมูลจาก .env
// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const USER_ID = process.env.USER_ID;

// // Firebase reference
// const db = admin.database();
// const ref = db.ref("/alarm_data");

// // เก็บสถานะที่ส่งข้อความไปแล้ว
// const sentMessages = {};

// // ฟังก์ชันสำหรับส่งข้อความไปยังผู้ใช้ (Push)
// async function sendMessageToUser(inputName, status, line_message) {
//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", {
//       to: USER_ID,
//       messages: [
//         {
//           type: "text",
//           text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] Message sent to User`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error sending message to User:", error);
//   }
// }

// // ฟังก์ชันสำหรับส่งข้อความไปยังกลุ่ม (Reply)
// async function sendReplyMessageToGroup(groupId, inputName, status, line_message) {
//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/reply", {
//       replyToken: groupId,  // ใช้ groupId ที่ได้รับจาก webhook
//       messages: [
//         {
//           type: "text",
//           text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] Message sent to Group`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error sending message to Group:", error);
//   }
// }

// // ฟังก์ชันเพื่อดึง groupId จาก webhook
// app.post("/webhook", async (req, res) => {
//   const events = req.body.events;
//   for (const event of events) {
//     if (event.source.type === "group") {
//       const groupId = event.source.groupId;
//       console.log("📌 Group ID:", groupId);
//       // สามารถเก็บ groupId นี้ไว้ในฐานข้อมูลหรือในตัวแปรได้เพื่อใช้งานในภายหลัง
//     }
//   }
//   res.sendStatus(200);
// });

// // Listener สำหรับการเปลี่ยนแปลงข้อมูลใน Firebase
// ref.on("child_changed", (snapshot) => {
//   const inputData = snapshot.val();
//   const inputName = snapshot.key;

//   // คัดกรองข้อมูลที่มี `timestamp` ล่าสุด
//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1]; // หาคีย์ที่มี timestamp ล่าสุด
//   const latestData = inputData[latestTimestamp];  // ดึงข้อมูลจาก timestamp ล่าสุด

//   const { status, line_message } = latestData;

//   console.log(`[${new Date().toISOString()}] Data changed for ${inputName}:`, latestData);

//   // ตรวจสอบสถานะที่เปลี่ยนแปลงและไม่เคยส่งข้อความมาก่อน
//   if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//     // ส่งข้อความไปที่ User
//     sendMessageToUser(inputName, status, line_message);
//     // ส่งข้อความไปที่ Group
//     sendReplyMessageToGroup("groupId", inputName, status, line_message);  // ใส่ groupId ที่ได้จาก webhook
//     sentMessages[inputName] = "Alarm"; // Mark as Alarm sent
//   } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//     // ส่งข้อความไปที่ User
//     sendMessageToUser(inputName, status, line_message);
//     // ส่งข้อความไปที่ Group
//     sendReplyMessageToGroup("groupId", inputName, status, line_message);  // ใส่ groupId ที่ได้จาก webhook
//     sentMessages[inputName] = "Clear"; // Mark as Clear sent
//   } else if (status === "normal") {
//     sentMessages[inputName] = false; // Reset the sent status for normal
//   }
// });

// // เริ่มรัน Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
/////////////////////////////////////////////////////// 

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config(); // โหลดข้อมูลจากไฟล์ .env

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");

// // เชื่อมต่อ Firebase โดยใช้ Service Account Key
// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// // โหลดข้อมูลจาก .env
// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

// // ใส่ groupId ที่ต้องการส่งข้อความไปหา
// const GROUP_ID = "Cfb45a07e786eb56c3290b0ae3e1528c6";

// // Firebase reference
// const db = admin.database();
// const ref = db.ref("/alarm_data");

// // เก็บสถานะที่ส่งข้อความไปแล้ว
// const sentMessages = {};

// // ฟังก์ชันสำหรับส่งข้อความ LINE
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", {
//       to: GROUP_ID,
//       messages: [
//         {
//           type: "text",
//           text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] Message sent to LINE Group:
//       input: ${inputName}, status: ${status}, message: ${line_message}`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error sending message:", error.response?.data || error.message);
//   }
// }

// // Listener สำหรับการเปลี่ยนแปลงข้อมูลใน Firebase
// ref.on("child_changed", (snapshot) => {
//   const inputData = snapshot.val();
//   const inputName = snapshot.key;

//   // คัดกรองข้อมูลที่มี `timestamp` ล่าสุด
//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1]; // หาคีย์ที่มี timestamp ล่าสุด
//   const latestData = inputData[latestTimestamp];  // ดึงข้อมูลจาก timestamp ล่าสุด

//   const { status, line_message } = latestData;

//   console.log(`[${new Date().toISOString()}] Data changed for ${inputName}:`, latestData);

//   // ตรวจสอบสถานะที่เปลี่ยนแปลงและไม่เคยส่งข้อความมาก่อน
//   if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Alarm"; // Mark as Alarm sent
//   } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Clear"; // Mark as Clear sent
//   } else if (status === "normal") {
//     sentMessages[inputName] = false; // Reset the sent status for normal
//   }
// });

// // เริ่มรัน Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

///////////////////ปรับปรุงโค้ด ว่าส่งข้อความออกจริง///////////////////////
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const LINE_GROUP_ID = process.env.LINE_GROUP_ID;

// const db = admin.database();
// const ref = db.ref("/alarm_data");

// const sentMessages = {};

// // ฟังก์ชันส่งข้อความ LINE ไปยังกลุ่ม
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", {
//       to: LINE_GROUP_ID,
//       messages: [
//         {
//           type: "text",
//           text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//         }
//       ]
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//       }
//     });

//     console.log(`[${new Date().toISOString()}] Message sent to LINE Group:
//       input: ${inputName}, status: ${status}, message: ${line_message}`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("Error sending message:", error.response?.data || error.message);
//   }
// }

// // Firebase Listener
// ref.on("child_changed", (snapshot) => {
//   const inputData = snapshot.val();
//   const inputName = snapshot.key;

//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1];
//   const latestData = inputData[latestTimestamp];

//   const { status, line_message } = latestData;

//   console.log(`[${new Date().toISOString()}] Data changed for ${inputName}:`, latestData);

//   if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Alarm";
//   } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//     sendLineMessage(line_message, inputName, status, line_message);
//     sentMessages[inputName] = "Clear";
//   } else if (status === "normal") {
//     sentMessages[inputName] = false;
//   }
// });

// // Webhook สำหรับรับข้อความจาก LINE และ log groupId
// app.post("/webhook", (req, res) => {
//   const events = req.body.events;

//   if (events && events.length > 0) {
//     events.forEach(event => {
//       if (event.source.type === "group") {
//         const groupId = event.source.groupId;
//         const userMessage = event.message?.text;
//         console.log(`📥 Message from group: ${groupId}`);
//         console.log(`💬 Text: ${userMessage}`);
//       }
//     });
//   }

//   res.status(200).send("OK");
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

////////////////////////////////////////////////////////

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const LINE_GROUP_ID = process.env.LINE_GROUP_ID;

// const db = admin.database();
// const ref = db.ref("/alarm_data");

// const sentMessages = {};

// // ฟังก์ชันส่งข้อความ LINE ไปยังกลุ่ม
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post(
//       "https://api.line.me/v2/bot/message/push",
//       {
//         to: LINE_GROUP_ID,
//         messages: [
//           {
//             type: "text",
//             text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//         }
//       }
//     );

//     console.log(`[${new Date().toISOString()}] ✅ Message sent to LINE Group:
//     input: ${inputName}, status: ${status}, message: ${line_message}`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("❌ Error sending message:", error.response?.data || error.message);
//   }
// }

// // Firebase Listener พร้อมการยืนยันสถานะก่อนส่ง
// ref.on("child_changed", async (snapshot) => {
//   const inputName = snapshot.key;
//   const inputData = snapshot.val();

//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1];
//   const latestData = inputData[latestTimestamp];

//   const { status, line_message } = latestData;

//   if (!status || !line_message) return;

//   console.log(`[${new Date().toISOString()}] 📡 Data changed for ${inputName}:`, latestData);

//   // รอ 2 วินาทีเพื่อตรวจสอบสถานะล่าสุดอีกครั้ง
//   setTimeout(async () => {
//     try {
//       const latestSnapshot = await snapshot.ref.once("value");
//       const confirmedData = latestSnapshot.val();

//       const confirmedTimestamps = Object.keys(confirmedData);
//       const confirmedLatestTimestamp = confirmedTimestamps[confirmedTimestamps.length - 1];
//       const confirmedLatestData = confirmedData[confirmedLatestTimestamp];

//       const confirmedStatus = confirmedLatestData.status;

//       if (confirmedStatus === status) {
//         if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//           sendLineMessage(line_message, inputName, status, line_message);
//           sentMessages[inputName] = "Alarm";
//         } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//           sendLineMessage(line_message, inputName, status, line_message);
//           sentMessages[inputName] = "Clear";
//         } else if (status === "normal") {
//           sentMessages[inputName] = false;
//         }
//       } else {
//         console.log(`⚠️ Status changed during confirmation. Skipping LINE send for ${inputName}.`);
//       }
//     } catch (error) {
//       console.error("❌ Error during status confirmation:", error.message);
//     }
//   }, 2000);
// });

// // Webhook สำหรับรับข้อความจาก LINE และ log groupId
// app.post("/webhook", (req, res) => {
//   const events = req.body.events;

//   if (events && events.length > 0) {
//     events.forEach(event => {
//       if (event.source.type === "group") {
//         const groupId = event.source.groupId;
//         const userMessage = event.message?.text;
//         console.log(`📥 Message from group: ${groupId}`);
//         console.log(`💬 Text: ${userMessage}`);
//       }
//     });
//   }

//   res.status(200).send("OK");
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
///////////////////////////////////////////////////////
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const LINE_GROUP_ID = process.env.LINE_GROUP_ID;

// const db = admin.database();
// const ref = db.ref("/alarm_data");

// const sentMessages = {};

// // ✅ ฟังก์ชันส่งข้อความ LINE ไปยังกลุ่ม
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post(
//       "https://api.line.me/v2/bot/message/push",
//       {
//         to: LINE_GROUP_ID,
//         messages: [
//           {
//             type: "text",
//             text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//         }
//       }
//     );

//     console.log(`[${new Date().toISOString()}] ✅ Message sent to LINE Group:
//     input: ${inputName}, status: ${status}, message: ${line_message}`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("❌ Error sending message:", error.response?.data || error.message);
//   }
// }

// // ✅ Firebase Listener พร้อมการยืนยันสถานะก่อนส่ง
// ref.on("child_changed", async (snapshot) => {
//   const inputName = snapshot.key;
//   const inputData = snapshot.val();

//   if (!inputData) return;

//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1];
//   const latestData = inputData[latestTimestamp];

//   const { status, line_message } = latestData;
//   if (!status || !line_message) return;

//   console.log(`[${new Date().toISOString()}] 📡 Data changed for ${inputName}:`, latestData);

//   // ✅ รอ 2 วินาทีเพื่อ confirm ว่าสถานะยังเหมือนเดิม
//   setTimeout(async () => {
//     try {
//       const latestSnapshot = await snapshot.ref.once("value");
//       const confirmedData = latestSnapshot.val();

//       if (!confirmedData) return;

//       const confirmedTimestamps = Object.keys(confirmedData);
//       const confirmedLatestTimestamp = confirmedTimestamps[confirmedTimestamps.length - 1];
//       const confirmedLatestData = confirmedData[confirmedLatestTimestamp];

//       const confirmedStatus = confirmedLatestData.status;

//       if (confirmedStatus === status) {
//         if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//           sendLineMessage(line_message, inputName, status, line_message);
//           sentMessages[inputName] = "Alarm";
//         } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//           sendLineMessage(line_message, inputName, status, line_message);
//           sentMessages[inputName] = "Clear";
//         } else if (status === "normal") {
//           sentMessages[inputName] = false;
//         }
//       } else {
//         console.log(`⚠️ Status changed during confirmation. Skipping LINE send for ${inputName}.`);
//       }
//     } catch (error) {
//       console.error("❌ Error during status confirmation:", error.message);
//     }
//   }, 2000);
// });

// // ✅ Webhook รับข้อความจาก LINE + log groupId + ตอบกลับข้อความ
// app.post("/webhook", async (req, res) => {
//   const events = req.body.events;

//   if (events && events.length > 0) {
//     for (const event of events) {
//       // เช็คว่าเป็นข้อความจาก group และเป็นข้อความ text
//       if (event.type === "message" && event.message.type === "text" && event.source.type === "group") {
//         const groupId = event.source.groupId;
//         const userMessage = event.message.text;
//         const replyToken = event.replyToken;

//         console.log(`📥 Message from group: ${groupId}`);
//         console.log(`💬 Text: ${userMessage}`);
//         console.log(`👉 Copy this GROUP ID to your .env file as LINE_GROUP_ID=${groupId}`);

//         // ✅ ตอบกลับข้อความ
//         try {
//           await axios.post(
//             "https://api.line.me/v2/bot/message/reply",
//             {
//               replyToken: replyToken,
//               messages: [
//                 {
//                   type: "text",
//                   text: `📡 รับข้อความของคุณแล้ว: "${userMessage}"`
//                 }
//               ]
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//               }
//             }
//           );
//           console.log("✅ Reply message sent.");
//         } catch (err) {
//           console.error("❌ Error replying to message:", err.response?.data || err.message);
//         }
//       }
//     }
//   }

//   res.status(200).send("OK");
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
//////////////////////////////////////////

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
// const LINE_GROUP_ID = process.env.LINE_GROUP_ID;
// const LINE_USER_ID = "U19981508421d15d58f561bc47278cfc1"; // <-- เพิ่ม User ID ที่ต้องการส่งหา

// const db = admin.database();
// const ref = db.ref("/alarm_data");

// const sentMessages = {};

// // ✅ ฟังก์ชันส่งข้อความ LINE
// async function sendLineMessage(message, inputName, status, line_message) {
//   try {
//     const response = await axios.post(
//       "https://api.line.me/v2/bot/message/push",
//       {
//         to: LINE_GROUP_ID, // หรือจะเปลี่ยนเป็น LINE_GROUP_ID ถ้าส่งหากลุ่ม
//         messages: [
//           {
//             type: "text",
//             text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//         }
//       }
//     );

//     console.log(`[${new Date().toISOString()}] ✅ Message sent to LINE`);
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error("❌ Error sending message:", error.response?.data || error.message);
//   }
// }

// // ✅ Firebase Listener พร้อมการยืนยันสถานะก่อนส่ง
// ref.on("child_changed", async (snapshot) => {
//   const inputName = snapshot.key;
//   const inputData = snapshot.val();

//   if (!inputData) return;

//   const timestamps = Object.keys(inputData);
//   const latestTimestamp = timestamps[timestamps.length - 1];
//   const latestData = inputData[latestTimestamp];

//   const { status, line_message } = latestData;
//   if (!status || !line_message) return;

//   console.log(`[${new Date().toISOString()}] 📡 Data changed for ${inputName}:`, latestData);

//   // ✅ รอ 2 วินาทีเพื่อ confirm ว่าสถานะยังเหมือนเดิม
//   setTimeout(async () => {
//     try {
//       const latestSnapshot = await snapshot.ref.once("value");
//       const confirmedData = latestSnapshot.val();

//       if (!confirmedData) return;

//       const confirmedTimestamps = Object.keys(confirmedData);
//       const confirmedLatestTimestamp = confirmedTimestamps[confirmedTimestamps.length - 1];
//       const confirmedLatestData = confirmedData[confirmedLatestTimestamp];

//       const confirmedStatus = confirmedLatestData.status;

//       if (confirmedStatus === status) {
//         if (status === "Alarm" && sentMessages[inputName] !== "Alarm") {
//           sendLineMessage(line_message, inputName, status, line_message);
//           sentMessages[inputName] = "Alarm";
//         } else if (status === "Clear Alarm" && sentMessages[inputName] === "Alarm") {
//           sendLineMessage(line_message, inputName, status, line_message);
//           sentMessages[inputName] = "Clear";
//         } else if (status === "normal") {
//           sentMessages[inputName] = false;
//         }
//       } else {
//         console.log(`⚠️ Status changed during confirmation. Skipping LINE send for ${inputName}.`);
//       }
//     } catch (error) {
//       console.error("❌ Error during status confirmation:", error.message);
//     }
//   }, 2000);
// });

// // ✅ Webhook สำหรับรับข้อความจาก LINE + log groupId
// app.post("/webhook", async (req, res) => {
//   const events = req.body.events;

//   if (events && events.length > 0) {
//     for (const event of events) {
//       if (event.type === "message" && event.message.type === "text" && event.source.type === "group") {
//         const groupId = event.source.groupId;
//         const userMessage = event.message.text;
//         const replyToken = event.replyToken;

//         console.log(`📥 Message from group: ${groupId}`);
//         console.log(`💬 Text: ${userMessage}`);
//         console.log(`👉 Copy this GROUP ID to your .env file as LINE_GROUP_ID=${groupId}`);

//         // ✅ ตอบกลับข้อความ
//         try {
//           await axios.post(
//             "https://api.line.me/v2/bot/message/reply",
//             {
//               replyToken: replyToken,
//               messages: [
//                 {
//                   type: "text",
//                   text: `📡 รับข้อความของคุณแล้ว: "${userMessage}"`
//                 }
//               ]
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
//               }
//             }
//           );
//           console.log("✅ Reply message sent.");
//         } catch (err) {
//           console.error("❌ Error replying to message:", err.response?.data || err.message);
//         }
//       }
//     }
//   }

//   res.status(200).send("OK");
// });

// // ✅ เริ่ม server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
/////////////// เพิ่ม CLOUD FUNTION ///////////////////////////

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://new-alarm-fac-r1-v5-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const LINE_GROUP_ID = process.env.LINE_GROUP_ID;
const db = admin.database();
const ref = db.ref("/alarm_data");

const sentMessages = {};

// ✅ ฟังก์ชันส่งข้อความไปยัง LINE Group
async function sendLineMessage(message, inputName, status, line_message) {
  try {
    const response = await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: LINE_GROUP_ID,
        messages: [
          {
            type: "text",
            text: `🔔 ${inputName}\nStatus: ${status}\nMessage: ${line_message}\nTime: ${new Date().toLocaleString()}`
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
        }
      }
    );

    console.log(`[${new Date().toISOString()}] ✅ Message sent to LINE`);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("❌ Error sending message:", error.response?.data || error.message);
  }
}

// ✅ ตรวจจับการเปลี่ยนแปลงข้อมูลใน Firebase
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

// ✅ Webhook สำหรับรับข้อความจาก LINE และ log groupId
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
                  text: `📡 รับข้อความของคุณแล้ว: "${userMessage}"`
                }
              ]
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
              }
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





