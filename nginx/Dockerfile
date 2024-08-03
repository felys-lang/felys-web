FROM nginx:alpine

COPY ./templates /etc/nginx/templates

COPY felys.dev.pem /etc/ssl/certs
COPY felys.dev.key /etc/ssl/certs

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
