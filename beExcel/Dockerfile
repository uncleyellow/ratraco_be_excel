FROM node:18

# Cập nhật package list và cài đặt Python, FFmpeg
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Cài đặt yt-dlp
RUN python3 -m pip install --no-cache-dir --upgrade pip yt-dlp

# Đặt thư mục làm việc
WORKDIR /app

# Copy mã nguồn vào container
COPY . .

# Cài đặt dependencies Node.js
RUN npm ci

# Khởi chạy ứng dụng
CMD ["npm", "start"]
