use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn message() -> String {
    String::from("hello, world!")
}
