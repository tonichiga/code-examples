import { axiosForPublic } from "@/07.shared/api";
import { logger } from "@/07.shared/utils";
import { NextRequest, NextResponse } from "next/server";

interface ILoginResponse {
  token: string;
  tokenExpires: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const clientIP = req.headers["x-real-ip"];
  const { hash } = await req.json();

  try {
    const response = await axiosForPublic.post(
      "/auth/login",
      { hash },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-real-ip": clientIP,
        },
      }
    );

    const data = response.data as ILoginResponse;

    const res = new Response(JSON.stringify(response.data), {
      status: response.status,
    });

    res.headers.set(
      "Set-Cookie",
      `token=${data.token}; Max-Age=${data.tokenExpires}; Path=/; SameSite=Strict`
    );

    return res;
  } catch (error) {
    logger("Hash validate error", error);
    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: "Internal Next Error",
    });
  }
}
