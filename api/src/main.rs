mod rsffi;

use std::str::FromStr;
use std::time::Duration;
use axum::{Router, Json, BoxError};
use axum::error_handling::HandleErrorLayer;
use axum::http::StatusCode;
use axum::routing::{get, post};
use serde::{Deserialize, Serialize};
use tokio::net::TcpListener;
use tower::buffer::BufferLayer;
use tower::limit::RateLimitLayer;
use tower::ServiceBuilder;
use felys::{Language, Worker};
use crate::rsffi::register;

#[tokio::main]
async fn main() {
    let ignore = |_: BoxError| async {
        StatusCode::INTERNAL_SERVER_ERROR
    };

    let limit = ServiceBuilder::new()
        .layer(HandleErrorLayer::new(ignore))
        .layer(BufferLayer::new(256))
        .layer(RateLimitLayer::new(10, Duration::from_secs(1)));

    let app = Router::new()
        .route("/", get(|| async { "Felys Web API" } ))
        .route("/execute", post(execute))
        .layer(limit);

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn execute(Json(payload): Json<Code>) -> Json<Report> {
    let lang = Language::from_str(payload.lang.as_str())
        .unwrap_or(Language::EN);

    let mixin = register(&lang);
    let mut main = Worker::new(mixin, 0.05, lang);
    let report = match main.exec(payload.body) {
        Ok(s) => Report { msg: s.stdout, ok: true},
        Err(e) => Report { msg: e.to_string(), ok: false}
    };
    Json(report)
}

#[derive(Deserialize)]
struct Code {
    body: String,
    lang: String
}

#[derive(Serialize)]
struct Report {
    msg: String,
    ok: bool
}
