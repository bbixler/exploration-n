use aws_lambda_events::event::apigw::{ApiGatewayProxyRequest, ApiGatewayProxyResponse};
use aws_lambda_events::encodings::Body;
use http::header::HeaderMap;
use lambda_runtime::{handler_fn, Context, Error};
use log::LevelFilter;
use simple_logger::SimpleLogger;
use serde::Serialize;

#[derive(Debug, Serialize)]
struct Greeting {
    hello: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new().with_level(LevelFilter::Info).init().unwrap();

    let func = handler_fn(my_handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

pub(crate) async fn my_handler(_event: ApiGatewayProxyRequest, _ctx: Context) -> Result<ApiGatewayProxyResponse, Error> {
    //let path = event.path.unwrap();
    let sample = Greeting {
        hello: String::from("Rustacean"),
    };
    let json = serde_json::to_string(&sample)?;

    let resp = ApiGatewayProxyResponse {
        status_code: 200,
        headers: HeaderMap::new(),
        multi_value_headers: HeaderMap::new(),
        body: Some(Body::Text(json)),
        //body: Some(Body::Text(format!("Hello from '{}'", path))),
        is_base64_encoded: Some(false),
    };

    Ok(resp)
}