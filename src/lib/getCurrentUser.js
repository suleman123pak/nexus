import { cookies } from "next/headers";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { verifyAuthToken } from "@/lib/auth";

const COOKIE_NAME = "nexus_auth";

export default async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyAuthToken(token);

    await connectToDatabase();

    const user = await User.findById(payload.id).select(
      "-password"
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Get current user error:", error);

    return null;
  }
}