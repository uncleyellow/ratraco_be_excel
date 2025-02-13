# Sử dụng Node.js 18
FROM node:18

# Cài đặt yt-dlp bằng apt-get thay vì pip3
RUN apt-get update && apt-get install -y yt-dlp ffmpeg

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ code vào container
COPY . .

# Cài đặt dependencies
RUN npm install

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "index.js"]
