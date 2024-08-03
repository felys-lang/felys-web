use std::str::FromStr;

use axum::http::Method;
use axum::{Json, Router};
use axum::routing::{get, post};
use felys::{Language, Worker};
use serde::{Deserialize, Serialize};
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};
use crate::rsffi::register;

mod rsffi;

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_headers(Any)
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);
    
    let app = Router::new()
        .route("/", get(|| async { "Felys Web API" }))
        .route("/execute", post(execute))
        .layer(cors);

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn execute(Json(payload): Json<Code>) -> Json<Report> {
    let lang = Language::from_str(payload.lang.as_str())
        .unwrap_or(Language::EN);

    let mixin = register(&lang);
    let mut main = Worker::new(mixin, 0.05, lang);
    let report = match main.exec(payload.body) {
        Ok(s) => Report {
            out: s.stdout,
            msg: s.exit.to_string(),
            ok: true,
        },
        Err(e) => Report {
            out: String::new(),
            msg: e.to_string(),
            ok: false,
        }
    };
    Json(report)
}

#[derive(Deserialize)]
struct Code {
    body: String,
    lang: String,
}

#[derive(Serialize)]
struct Report {
    out: String,
    msg: String,
    ok: bool,
}
