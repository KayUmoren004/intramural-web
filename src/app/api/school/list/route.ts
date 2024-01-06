import { BACKEND_URL } from "@/lib/constants";

export async function GET(request: Request) {
  const list = await fetch(BACKEND_URL + "/school/list", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await list.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
