import { useLoaderData } from "remix";

export async function loader() {
  let res;
  if (process.env.NODE_ENV === "development") {
    res = await fetch("http://localhost:43869/helloworld"); 
  }
  else {
    res = await fetch("https://exploration-n.netlify.app/helloworld"); 
  }
  return res.json();
  
  //let res = await fetch("http://localhost:43869/helloworld"); 
  //return res.json();
}

export default function Index() {
  const greeting = useLoaderData();
  return (
    <div>
      <h1 className="text-5xl font-bold text-blue-800">
        Hello from Netlify + Remix3
      </h1>
      Dynamic greeting from function: Hello, {greeting.hello}
      
    </div>
  );
}
