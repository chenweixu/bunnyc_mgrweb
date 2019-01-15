# 2018-09-18 11:14:02
# Version: 0.01
# bmgrweb

FROM nginx:1.15.1-alpine

LABEL author="chenwx"
LABEL version="0.1"

# add bmgrweb
ADD bmgrweb.tar.gz /usr/local/

ADD nginx.conf /etc/nginx/nginx.conf
# RUN rm /etc/nginx/conf.d/default.conf

# CMD
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 9001
