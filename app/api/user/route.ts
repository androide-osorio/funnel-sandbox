import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

import { UserCookieService } from "@/app/services/user-cookie";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ?? 'MY_ENCRYPTION_KEY';

const cookieService = UserCookieService({
	cookieName: "funnelator",
	encryptionKey: ENCRYPTION_KEY,
	maxAge: 30 * 24 * 60 * 60,
});

export function GET(req: NextRequest, res: NextResponse) {
  const userCookie = req.cookies.get("funnelator");
  if (!userCookie) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { userId, name } = cookieService.parse(userCookie.value);

  return Response.json({ userId, name }, { status: 200 });
}

export function POST(req: NextRequest, res: NextResponse) {
  const userCookie = req.cookies.get("funnelator");
  if (userCookie) {
    const { userId, name } = cookieService.parse(userCookie.value);
    return Response.json({ userId, name });
  }

  const userId = uuidv4();
  const name = faker.internet.userName();
  const cookie = cookieService.create(userId, name);

  res.cookies.set("funnelator", cookie);
  return Response.json({ userId, name });
}
