use std::str::FromStr;
use std::time::Duration;
use felys::{Language, Summary, Worker};
use serde::Serialize;
use wasm_bindgen::prelude::*;
use crate::rsffi::register;

mod rsffi;

#[wasm_bindgen]
pub fn execute(code: String, lang: String) -> String {
    let lang = Language::from_str(lang.as_str())
        .unwrap_or(Language::EN);
    let mixin = register(&lang);
    let mut worker = Worker::new(mixin, 1.0, lang);
    let result = match worker.exec(code) {
        Ok(s) => Report::from(s),
        Err(e) => Report::from(e.to_string())
    };
    serde_json::to_string(&result).unwrap()
}

#[derive(Serialize)]
struct Report {
    time: Option<(Duration, Duration, Duration)>,
    stdout: String,
    exit: Option<String>,
}

impl From<Summary> for Report {
    fn from(value: Summary) -> Self {
        Self {
            time: Some(value.time),
            stdout: value.stdout,
            exit: Some(value.exit.to_string())
        }
    }
}

impl From<String> for Report {
    fn from(value: String) -> Self {
        Self {
            time: None,
            stdout: value,
            exit: None
        }
    }
}
