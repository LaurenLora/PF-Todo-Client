import LogOutButton from "@/components/login/LogOutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  return (
    <div className="w-full flex-col h-screen flex justify-center items-center text-5xl">
      <p>Welcome the Playable Factory Todo App!</p>
      <LogOutButton />
    </div>
  );
}
