FROM rust:alpine AS builder

RUN apk add libc-dev

COPY . /app/

WORKDIR /app/

RUN ["cargo", "build", "--release"]


FROM alpine:latest

COPY --from=builder /app/target/release/api /

EXPOSE 8000

CMD ["./api"]
