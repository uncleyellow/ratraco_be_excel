const express = require("express");
const { google } = require("googleapis");
const cors = require("cors"); // Import thư viện cors


const app = express();

// Sử dụng middleware cors
app.use(cors()); // Mặc định cho phép tất cả các origin

// Thiết lập cấu hình Google Auth
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // Đường dẫn tới credentials.json
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

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

// Route cho sheet đầu tiên
app.get("/sheet1", async (req, res) => {
  try {
    const data = await getSheetData("charts!A3:L8"); // Thay đổi range tùy ý
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching sheet1 data: " + error.message);
  }
});

// Route cho sheet thứ hai
app.get("/sheet2", async (req, res) => {
  try {
    const data = await getSheetData("charts!A31:L36"); // Thay đổi range tùy ý
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching sheet2 data: " + error.message);
  }
});

// Route cho sheet "TH_BC"
app.get("/sheet3", async (req, res) => {
  try {
    const data = await getSheetData("charts!A56:B60");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});


// Route cho sheet "TH_BC"
app.get("/sheet4", async (req, res) => {
    try {
      const data = await getSheetData("charts!B70:C74");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet5", async (req, res) => {
    try {
      const data = await getSheetData("charts!A95:C101");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet6", async (req, res) => {
    try {
      const data = await getSheetData("charts!A121:L126");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet7", async (req, res) => {
    try {
      const data = await getSheetData("charts!A147:L149");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});



// Route cho sheet "TH_BC"
app.get("/sheet8", async (req, res) => {
    try {
      const data = await getSheetData("charts!A169:L171");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet9", async (req, res) => {
    try {
      const data = await getSheetData("charts!A173:B175");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet10", async (req, res) => {
    try {
      const data = await getSheetData("charts!A195:L197");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet11", async (req, res) => {
    try {
      const data = await getSheetData("charts!A219:L221");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet12", async (req, res) => {
    try {
      const data = await getSheetData("charts!I223:J227");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet13", async (req, res) => {
    try {
      const data = await getSheetData("charts!A244:L246");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet14", async (req, res) => {
    try {
      const data = await getSheetData("charts!A268:L270");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet15", async (req, res) => {
    try {
      const data = await getSheetData("charts!A295:L297");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet16", async (req, res) => {
    try {
      const data = await getSheetData("charts!I272:J275");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet17", async (req, res) => {
    try {
      const data = await getSheetData("charts!A319:L321");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet18", async (req, res) => {
    try {
      const data = await getSheetData("charts!I323:J326");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet19", async (req, res) => {
    try {
      const data = await getSheetData("charts!A346:L348");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet20", async (req, res) => {
    try {
      const data = await getSheetData("charts!A370:L372");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet21", async (req, res) => {
    try {
      const data = await getSheetData("charts!H373:I380");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet22", async (req, res) => {
    try {
      const data = await getSheetData("charts!A396:L398");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet23", async (req, res) => {
    try {
      const data = await getSheetData("charts!A421:L423");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet24", async (req, res) => {
    try {
      const data = await getSheetData("charts!H424:I428");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet25", async (req, res) => {
    try {
      const data = await getSheetData("charts!A485:L488");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet26", async (req, res) => {
    try {
      const data = await getSheetData("charts!A507:M509");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheet27", async (req, res) => {
    try {
      const data = await getSheetData("charts!E534:P536");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet28", async (req, res) => {
    try {
      const data = await getSheetData("charts!E539:P541");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet29", async (req, res) => {
    try {
      const data = await getSheetData("charts!E544:P546");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet30", async (req, res) => {
    try {
      const data = await getSheetData("charts!E549:P551");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet31", async (req, res) => {
    try {
      const data = await getSheetData("charts!A576:L579");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet32", async (req, res) => {
    try {
      const data = await getSheetData("charts!B591:M593");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});

// Route cho sheet "TH_BC"
app.get("/sheet33", async (req, res) => {
    try {
      const data = await getSheetData("charts!B594:M603");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).send("Error fetching TH_BC data: " + error.message);
    }
});


// Route cho sheet "TH_BC"
app.get("/sheeta1", async (req, res) => {
  try {
    const data = await getSheetData("charts!A447:L349");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

// Route cho sheet "TH_BC"
app.get("/sheeta2", async (req, res) => {
  try {
    const data = await getSheetData("charts!I467:J469");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});


//route rieeng de lm di bao cao
// Route cho sheet "TH_BC"
app.get("/sheetb0", async (req, res) => {
  try {
    const data = await getSheetData("charts!A2:D3");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb1", async (req, res) => {
  try {
    const data = await getSheetData("charts!A4:D5");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb2", async (req, res) => {
  try {
    const data = await getSheetData("charts!A8:D9");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb3", async (req, res) => {
  try {
    const data = await getSheetData("charts!A12:D13");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb4", async (req, res) => {
  try {
    const data = await getSheetData("charts!A14:D15");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb5", async (req, res) => {
  try {
    const data = await getSheetData("charts!A16:D17");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb6", async (req, res) => {
  try {
    const data = await getSheetData("charts!A18:D19");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb7", async (req, res) => {
  try {
    const data = await getSheetData("charts!A22:D23");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});


app.get("/sheetb8", async (req, res) => {
  try {
    const data = await getSheetData("charts!A34:D35");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb9", async (req, res) => {
  try {
    const data = await getSheetData("charts!A38:D40");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb10", async (req, res) => {
  try {
    const data = await getSheetData("charts!A41:D43");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb11", async (req, res) => {
  try {
    const data = await getSheetData("charts!A44:D49");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb12", async (req, res) => {
  try {
    const data = await getSheetData("charts!A52:D53");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb13", async (req, res) => {
  try {
    const data = await getSheetData("charts!A54:D55");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb14", async (req, res) => {
  try {
    const data = await getSheetData("charts!A58:D59");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb15", async (req, res) => {
  try {
    const data = await getSheetData("charts!A60:D61");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb16", async (req, res) => {
  try {
    const data = await getSheetData("charts!A64:D65");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb17", async (req, res) => {
  try {
    const data = await getSheetData("charts!A66:D67");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb18", async (req, res) => {
  try {
    const data = await getSheetData("charts!A70:D71");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
}); 


//lấy nhận xét 

app.get("/sheetcmt0", async (req, res) => {
  try {
    const data = await getSheetData("charts!F3");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
}); 

app.get("/sheetb19", async (req, res) => {
  try {
    const data = await getSheetData("charts!A72:D73");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb20", async (req, res) => {
  try {
    const data = await getSheetData("charts!A76:D77");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb21", async (req, res) => {
  try {
    const data = await getSheetData("charts!A78:D79");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
}); 

app.get("/sheetb22", async (req, res) => {
  try {
    const data = await getSheetData("charts!A82:D83");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb23", async (req, res) => {
  try {
    const data = await getSheetData("charts!A84:D85");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb24", async (req, res) => {
  try {
    const data = await getSheetData("charts!A88:D90");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
}); 

app.get("/sheetb25", async (req, res) => {
  try {
    const data = await getSheetData("charts!A93:D95");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
});

app.get("/sheetb26", async (req, res) => {
  try {
    const data = await getSheetData("charts!A98:D100");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
}); 

app.get("/sheetb27", async (req, res) => {
  try {
    const data = await getSheetData("charts!A26:B31");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }
}); 

app.get("/sheetb28", async (req, res) => {
  try {
    const data = await getSheetData("charts!C26:D31");
    res.status(200).json({ data });
  } catch (error) { 
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }

});   

app.get("/sheetb29", async (req, res) => {
  try {
    const data = await getSheetData("charts!E26:F31");
    res.status(200).json({ data });
  } catch (error) { 
    res.status(500).send("Error fetching TH_BC data: " + error.message);
  }


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
