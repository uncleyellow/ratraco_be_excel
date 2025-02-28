# Sử dụng Node.js 18 làm base image
FROM node:18

# Cập nhật package list và cài đặt Python, FFmpeg
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Cài đặt yt-dlp qua pip để đảm bảo chạy đúng
RUN python3 -m pip install --no-cache-dir --upgrade pip && \
    python3 -m pip install --no-cache-dir yt-dlp

# Kiểm tra yt-dlp đã được cài đặt đúng chưa
RUN yt-dlp --version

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ code vào container
COPY . .

# Cài đặt dependencies Node.js
RUN npm install --production

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "index.js"]
