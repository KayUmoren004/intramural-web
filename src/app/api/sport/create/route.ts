import { BACKEND_URL } from "@/lib/constants";

export async function POST(request: Request) {
  const { name, season, description, rulesUrl, token, schoolId } =
    await request.json();

  const create = await fetch(BACKEND_URL + "/sport/create", {
    method: "POST",
    body: JSON.stringify({
      name,
      season,
      description,
      rulesUrl,
      schoolId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!create.ok) {
    return new Response(JSON.stringify(await create.json()), {
      status: 400,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const data = await create.json();

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
