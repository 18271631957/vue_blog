# 第一阶段：node镜像打包 testo
# 使用最新版本的Node.js镜像作为基础镜像，并给它命名为xh-blog
FROM node:latest AS xh-blog
# 设置工作目录为/build-app
WORKDIR /build-app
# 将当前目录（即Dockerfile所在目录）的所有文件和子目录复制到容器中的/build-app目录
COPY . .
# 安装依赖
RUN npm install
# 构建前端应用
RUN npm run build

# 第二阶段：nginx打包
# 使用最新版本的Nginx镜像作为基础镜像
FROM nginx:latest
# 声明容器将监听80端口，这是HTTP服务的默认端口
EXPOSE 80
# 设置工作目录为/app
WORKDIR /app
# 将本地的nginx.conf文件复制到容器的/etc/目录下，替换默认的Nginx配置
# COPY nginx.conf /etc/nginx/conf.d/default.conf


# 第三阶段：将第一阶段的静态文件复制到nginx中
# 这条命令用于删除Nginx默认的HTML目录
RUN rm -rf /usr/share/nginx/html
# 这条命令用于在Nginx的HTML目录下创建一个新的空目录。如果目录已经存在，这个命令不会报错，只是不会创建新的目录
RUN mkdir /usr/share/nginx/html
# 从另一个名为xh-blog的Docker镜像中复制文件
COPY --from=xh-blog /build-app/dist /usr/share/nginx/html

# 运行 CMD是Dockerfile中的最后一个指令，用于指定容器启动时执行的命令
# 在这个例子中，容器启动时会运行nginx -g daemon off命令，
# 其中nginx是Nginx服务器的命令，
# -g daemon off表示以非守护进程的方式运行Nginx，这样容器不会在启动后立即退出
CMD ["nginx", "-g", "daemon off;"]
