use axum::http::Method;
use axum::routing::{get, post};
use axum::{Json, Router};
use felys::Packrat;
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
    let result = wrapper(code);
    let elapsed = format!("{:?}", start.elapsed());
    let report = Report { elapsed, result };
    report.into()
}

fn wrapper(code: String) -> String {
    let (ast, intern) = match Packrat::from(code).parse() {
        Ok(x) => x,
        Err(e) => return format!("syntax error: {}", e),
    };
    let value = match ast.exec(intern, 100, 100) {
        Ok(x) => x,
        Err(e) => return format!("runtime error: {}", e),
    };
    value.to_string()
}

#[derive(Serialize)]
struct Report {
    elapsed: String,
    result: String,
}
