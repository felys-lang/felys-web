use axum::http::Method;
use axum::routing::{get, post};
use axum::{Json, Router};
use serde::Serialize;
use std::time::Instant;
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_headers(Any)
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);

    let app = Router::new()
        .route("/", get(|| async { "Felys-Web API" }))
        .route("/execute", post(execute))
        .layer(cors);

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn execute(code: String) -> Json<Report> {
    let start = Instant::now();
    let (prog, pool) = match felys::parse(code) {
        Ok(x) => x,
        Err(_) => return Report::new(start, "syntax error".to_string()).into()
    };
    let value = match felys::exec(prog, pool, 100, 100) {
        Ok(x) => x,
        Err(e) => return Report::new(start, e.to_string()).into()
    };
    Report::new(start, value.to_string()).into()
}

#[derive(Serialize)]
struct Report {
    elapsed: String,
    result: String,
}

impl Report {
    fn new(start: Instant, result: String) -> Self {
        Self { elapsed: format!("{:?}", start.elapsed()), result }
    }
}