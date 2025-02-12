# Sử dụng Node.js 18 chính thức
FROM node:18

# Cài đặt Python, FFmpeg, yt-dlp
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg \
    && pip3 install yt-dlp \
    && ln -s /usr/local/bin/yt-dlp /usr/bin/yt-dlp \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Đặt thư mục làm việc
WORKDIR /app

# Copy source code vào container
COPY package*.json ./
RUN npm ci  # Cài đặt dependencies nhanh hơn

COPY . .

# Mở port 3000
EXPOSE 3000

# Chạy server
CMD ["node", "server.js"]
