const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Cấu hình Socket.IO với CORS
const io = socketIo(server, {
  cors: {
    // origin: ["https://uncleyellow.github.io", "http://localhost:4200"],
    origin: "*", // Cho phép tất cả các origin trong môi trường development
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Cấu hình CORS cho Express
app.use(cors({
  // origin: ["https://uncleyellow.github.io", "http://localhost:4200"],
  origin: "*", // Cho phép tất cả các origin trong môi trường development 
  credentials: true
}));

// Lưu trữ thông tin về các phòng và người tham gia
const rooms = new Map();

// Sử dụng middleware cors
// app.use(cors()); // Mặc định cho phép tất cả các origin


// Cung cấp file static (frontend)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Xử lý khi người dùng tham gia phòng
  socket.on('joinRoom', (roomId, participant) => {
    console.log(`User ${participant.name} joining room ${roomId}`);
    
    // Tham gia phòng Socket.IO
    socket.join(roomId);
    
    // Khởi tạo phòng nếu chưa tồn tại
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }
    
    // Lưu thông tin người tham gia
    const room = rooms.get(roomId);
    room.set(socket.id, {
      id: participant.id,
      name: participant.name,
      socketId: socket.id
    });

    // Thông báo cho những người khác trong phòng
    socket.to(roomId).emit('newParticipant', {
      id: participant.id,
      name: participant.name
    });

    // Gửi danh sách người tham gia hiện tại cho người mới
    const participants = Array.from(room.values());
    socket.emit('updateParticipants', participants);
  });

  // Xử lý tín hiệu WebRTC
  socket.on('signal', (data) => {
    console.log(`🚀 Chuyển tiếp signal: ${data.type} từ ${socket.id} đến ${data.to}`);
    io.to(data.to).emit('signal', { ...data, from: socket.id });

    // Tìm socket ID của người nhận
    let recipientSocketId = data.to;
    
    // Chuyển tiếp tín hiệu
    io.to(recipientSocketId).emit('signal', {
      ...data,
      from: socket.id
    });
  });

  // Xử lý khi người dùng rời phòng
  socket.on('leaveRoom', (roomId, participantId) => {
    handleParticipantLeave(socket, roomId, participantId);
  });

  // Xử lý khi người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Tìm và xử lý rời phòng cho tất cả các phòng mà người dùng tham gia
    rooms.forEach((room, roomId) => {
      if (room.has(socket.id)) {
        const participant = room.get(socket.id);
        handleParticipantLeave(socket, roomId, participant.id);
      }
    });
  });
});

// Hàm xử lý khi người dùng rời phòng
function handleParticipantLeave(socket, roomId, participantId) {
  if (rooms.has(roomId)) {
    const room = rooms.get(roomId);
    room.delete(socket.id);
    
    // Nếu phòng trống, xóa phòng
    if (room.size === 0) {
      rooms.delete(roomId);
    } else {
      // Thông báo cho những người còn lại
      socket.to(roomId).emit('participantLeft', participantId);
      
      // Cập nhật danh sách người tham gia
      const participants = Array.from(room.values());
      io.to(roomId).emit('updateParticipants', participants);
    }
  }
  
  // Rời phòng Socket.IO
  socket.leave(roomId);
}

// Giữ lại các routes hiện có của bạn...
// Thêm middleware để parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./users");
app.use("/api/users", usersRoutes);

// Chuyển GOOGLE_SERVICE_KEY từ JSON string thành Object
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_KEY);
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



app.get("/download/soundcloud", async (req, res) => {
  const trackUrl = req.query.url;
  if (!trackUrl) return res.status(400).json({ error: "Thiếu URL track!" });

  const outputPath = `/tmp/soundcloud.mp3`; // Đổi thành MP3
  const command = `yt-dlp -f "bestaudio" --extract-audio --audio-format mp3 -o "${outputPath}" "${trackUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "Lỗi tải nhạc từ SoundCloud!", details: stderr });
    }

    if (!fs.existsSync(outputPath)) {
      return res.status(500).json({ error: "File không tồn tại sau khi tải!" });
    }

    res.download(outputPath, "soundcloud.mp3", (err) => {
      if (err) return res.status(500).json({ error: "Lỗi gửi file!", details: err.message });
      fs.unlinkSync(outputPath);
    });
  });
});


app.get("/download/youtube", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Thiếu URL video!" });

  const userCookies = req.headers["cookie"]; // Lấy cookies từ client
  if (!userCookies) {
    return res.status(400).json({ error: "Vui lòng đăng nhập YouTube trên trình duyệt của bạn!" });
  }

  const outputPath = `/tmp/youtube.mp3`;
  const command = `yt-dlp --cookies-from-browser chrome \
      -f "bestaudio" --extract-audio --audio-format mp3 \
      --no-check-certificate --geo-bypass --force-ipv4 \
      --limit-rate 100K -o "${outputPath}" "${videoUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "Lỗi tải nhạc từ YouTube!", details: stderr });
    }

    if (!fs.existsSync(outputPath)) {
      return res.status(500).json({ error: "File không tồn tại sau khi tải!" });
    }

    res.download(outputPath, "youtube.mp3", (err) => {
      if (err) return res.status(500).json({ error: "Lỗi gửi file!", details: err.message });
      fs.unlinkSync(outputPath);
    });
  });
});




const PORT = process.env.PORT || 3000;  // 🚀 Dùng cổng từ Railway hoặc mặc định là 3000

// Khởi động server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
