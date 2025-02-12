 
FROM node:18

# Cài đặt FFmpeg và yt-dlp
RUN apt-get update && apt-get install -y ffmpeg wget && \
    wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Tạo thư mục ứng dụng và copy mã nguồn vào container
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Mở cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "server.js"]
