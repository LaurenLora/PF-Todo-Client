import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isAuthPath =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

  if (isLoggedIn && isAuthPath) {
    const redirectUrl = new URL("/dashboard", nextUrl);

    return NextResponse.redirect(redirectUrl);
  }

  if (!isLoggedIn && nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/dashboard",
    "/login",
    "/register"
  ]
};
