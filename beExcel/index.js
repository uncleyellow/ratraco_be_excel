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
  { path: "/sheetb0", range: "charts!A2:D3" },
  { path: "/sheetb1", range: "charts!A4:D5" },
  { path: "/sheetb2", range: "charts!A8:D9" },
  { path: "/sheetb3", range: "charts!A12:D13" },
  { path: "/sheetb4", range: "charts!A14:D15" },
  { path: "/sheetb5", range: "charts!A16:D17" },
  { path: "/sheetb6", range: "charts!A18:D19" },
  { path: "/sheetb7", range: "charts!A22:D23" },
  { path: "/sheetb8", range: "charts!A34:D35" },
  { path: "/sheetb9", range: "charts!A38:D40" },
  { path: "/sheetb10", range: "charts!A41:D43" },
  { path: "/sheetb11", range: "charts!A44:D49" },
  { path: "/sheetb12", range: "charts!A52:D53" },
  { path: "/sheetb13", range: "charts!A54:D55" },
  { path: "/sheetb14", range: "charts!A58:D59" },
  { path: "/sheetb15", range: "charts!A60:D61" },
  { path: "/sheetb16", range: "charts!A64:D65" },
  { path: "/sheetb17", range: "charts!A66:D67" },
  { path: "/sheetb18", range: "charts!A70:D71" },
  { path: "/sheetb19", range: "charts!A72:D73" },
  { path: "/sheetb20", range: "charts!A76:D77" },
  { path: "/sheetb21", range: "charts!A78:D79" },
  { path: "/sheetb22", range: "charts!A82:D83" },
  { path: "/sheetb23", range: "charts!A84:D85" },
  { path: "/sheetb24", range: "charts!A88:D90" },
  { path: "/sheetb25", range: "charts!A93:D95" },
  { path: "/sheetb26", range: "charts!A98:D100" },
  { path: "/sheetb27", range: "charts!A26:B31" },
  { path: "/sheetb28", range: "charts!C26:D31" },
  { path: "/sheetb29", range: "charts!E26:F31" },
  // { path: "/tests", range: "charts!A26:F29" },
  // { path: "/full", range: "Tong_hop!A6:H53" },
  // { path: "/runPlan", range: "KH_Chay_Tau_25!A4:N33" },
  { path: "/sheetcmt0", range: "charts!F3" },
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


app.get("/tests", async (req, res) => {
  try {
    const data = await getSheetData("charts!A26:F29");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
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
