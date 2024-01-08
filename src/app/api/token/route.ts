import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth();

  if (!session) {
    // Trigger redirect to login
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = session?.backendToken.accessToken;
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
