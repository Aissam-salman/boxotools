
async function loader() {
  const path = "/api/home";
  const BASE_URL = "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  const res = await fetch(url.href);
  const data = await res.json();
  console.log(data);
  return { ...data.data };
}

export default async function Home() {
  const data = await loader();
  console.log(data);

  return (
    <div>
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p>{ data.description }</p>
      </div>
  );
}
