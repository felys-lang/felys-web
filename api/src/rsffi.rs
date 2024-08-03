use std::collections::HashMap;

use felys::{Context, Language, Object, Output};

pub fn register(lang: &Language) -> HashMap<String, Object> {
    match lang {
        Language::ZH => HashMap::from([
            ("打印".into(), Object::Rust(print)),
        ]),
        Language::EN => HashMap::from([
            ("print".into(), Object::Rust(print)),
        ])
    }
}


fn print(cx: &mut Context) -> Output {
    let out = cx.args.iter()
        .map(|o| o.to_string())
        .collect::<Vec<String>>()
        .join(" ");
    cx.write(out);
    Object::None.into()
}
