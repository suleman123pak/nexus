import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_SECRET) {
  throw new Error("Please define AUTH_SECRET in .env.local");
}

const secret = new TextEncoder().encode(AUTH_SECRET);

export async function createAuthToken(user) {
  return await new SignJWT({
    id: user.id.toString(),
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAuthToken(token) {
  const { payload } = await jwtVerify(token, secret);

  return payload;
}