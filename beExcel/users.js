const express = require("express");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const spreadsheetId = "1k1hAax_PwIrPvmGJylfLjQC3hinPk0qqXR0a0sL36x0";
const RANGE = "users!A2:K";

// API lấy danh sách users
router.get("/", async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: RANGE });
    const rows = response.data.values || [];

    const users = rows.map((row, index) => ({
      stt: index + 1,
      id: row[0] || "",
      userName: row[1] || "",
      passWord: row[2] || "",
      address: row[3] || "",
      phoneNumbers: row[4] || "",
      departmentId: row[5] || "",
      jobsId: row[6] || "",
      role: row[7] || "",
      creatAt: row[8] || "",
      creatBy: row[9] || "",
    }));

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ Google Sheets" });
  }
});

// API thêm user mới
router.post("/", async (req, res) => {
  try {
    
    console.log('Request body:', req.body);
    const { userName, passWord, address, phoneNumbers, role, creatBy } = req.body;
    if (!userName || !passWord) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc!" });
    }

    const id = uuidv4(); // Tạo ID dạng GUID
    const creatAt = new Date().toISOString(); // Lấy ngày hiện tại

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[id, userName, passWord, address, phoneNumbers, "", "", role, creatAt, creatBy || "admin"]] },
    });

    res.json({ message: "Thêm user thành công!", user: { id, userName, passWord, address, phoneNumbers, role, creatAt, creatBy: creatBy || "admin" } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm dữ liệu vào Google Sheets" });
  }
});

module.exports = router;
