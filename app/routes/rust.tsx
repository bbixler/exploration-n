import { useLoaderData } from "remix";

export async function loader() {
    let res;
    if (process.env.NODE_ENV === "development") {
        res = await fetch("http://localhost:3000/.netlify/functions/rusty");
    }
    else {
        res = await fetch("https://exploration-n.netlify.app/.netlify/functions/rusty");
    }
    return res.json();

    /*
    export async function loader({ request }) {
    const url = new URL(request.url);
    console.log(url.hostname);
  }
    */

}

export default function Rust() {
    const greeting = useLoaderData();
    return (
        <div>
            <h1 className="text-5xl font-bold text-red-800">
                🦀 Rust running on Netlify
            </h1>
            Dynamic greeting from function: Hello, {greeting.hello}
        </div>
    );
}
