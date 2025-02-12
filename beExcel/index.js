const express = require("express");
const { google } = require("googleapis");
const cors = require("cors"); // Import thư viện cors


const app = express();

// Sử dụng middleware cors
app.use(cors()); // Mặc định cho phép tất cả các origin


// Chuyển GOOGLE_SERVICE_KEY từ JSON string thành Object
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_KEY);
console.log(serviceAccount)
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key.replace(/\\n/g, "\n"),  // Fix lỗi xuống dòng trong Private Key
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});


// Thiết lập cấu hình Google Auth
// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json", // Đường dẫn tới credentials.json
//   scopes: "https://www.googleapis.com/auth/spreadsheets",
// });

// ID của Google Sheet
const spreadsheetId = "1itgkdhtP-De1GQqFT3I4uG3mSXamHs_5M4F9yqpmHjc";

// Hàm lấy dữ liệu từ Google Sheets
const getSheetData = async (range) => {
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Lấy dữ liệu từ range được chỉ định
  const response = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values; // Trả về dữ liệu
};


const routes = [
  { path: "/sheetb4", range: "charts!A14:D15" },
  { path: "/sheetb5", range: "charts!A16:D17" },
  { path: "/sheetb6", range: "charts!A18:D19" },
];

routes.forEach(({ path, range }) => {
  app.get(path, async (req, res) => {
    try {
      const data = await getSheetData(range);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send(`Error fetching data for ${path}: ${error.message}`);
    }
  });
});









app.get("/full", async (req, res) => {
  try {
    const rawData = await getSheetData("Tong_hop!A6:H53");

    // Định dạng dữ liệu để giữ nguyên hàng và cột
    const headers = rawData[0];
    const formattedData = rawData.slice(1).map((row) => {
      let obj = {};
      headers.forEach((key, index) => {
        obj[key.trim() || `Column${index + 1}`] = row[index] ?? "";
      });
      return obj;
    });

    res.status(200).json({ headers, data: formattedData });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});


app.get("/runPlan", async (req, res) => {
  try {
    const rawData = await getSheetData("KH_Chay_Tau_25!A4:N33");

    if (!rawData || rawData.length === 0) {
      return res.status(200).json({ headers: [], data: [] });
    }

    // Kiểm tra xem hàng đầu tiên có dữ liệu không
    const headers = rawData[0].map((header, index) => 
      header && header.trim() ? header.trim() : `Column${index + 1}`
    );

    // Loại bỏ cột trùng lặp
    const uniqueHeaders = Array.from(new Set(headers));

    const formattedData = rawData.slice(1).map((row) => {
      let obj = {};
      uniqueHeaders.forEach((key, index) => {
        obj[key] = row[index] ?? "";
      });
      return obj;
    });

    res.status(200).json({ headers: uniqueHeaders, data: formattedData });
  } catch (error) {
    res.status(500).send("Error fetching KH_Chay_Tau_25 data: " + error.message);
  }
});
const PORT = process.env.PORT || 3000;  // 🚀 Dùng cổng từ Railway hoặc mặc định là 3000

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
