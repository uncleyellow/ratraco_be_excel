# Sử dụng Node.js 18
FROM node:18

# Cài đặt Python, FFmpeg và cập nhật yt-dlp từ source mới nhất
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg && \
    rm -rf /usr/bin/yt-dlp && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ code vào container
COPY . .

# Cài đặt dependencies Node.js
RUN npm install

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "index.js"]
