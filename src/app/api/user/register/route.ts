import { BACKEND_URL } from "@/lib/constants";

export async function POST(request: Request) {
  const { name, email, password, schoolDomain, role } = await request.json();

  const fullUser = {
    name,
    email,
    password,
    schoolDomain,
    role,
  };

  const register = await fetch(BACKEND_URL + "/auth/register", {
    method: "POST",
    body: JSON.stringify(fullUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!register.ok) {
    return new Response(JSON.stringify(await register.json()), {
      status: 400,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const data = await register.json();

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
