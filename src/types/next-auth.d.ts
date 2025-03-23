import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }
}
