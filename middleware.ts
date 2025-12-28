import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const protectedRoute = ["/dashboard", "/note"];
const authRotes = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRoute.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRotes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/note/:path*", "/login", "/register"],
};
