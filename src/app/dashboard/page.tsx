import NewTaskButton from "@/components/dashboard/NewTaskButton";
import TaskList from "@/components/dashboard/TaskList";
import { findAllTasksByUserId } from "@/lib/api/taskApi";
import { auth } from "@/lib/auth";
import { Task } from "@/types";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default async function Page() {
  const session = await auth();

  let tasks: Task[] = [];

  if (session) {
    tasks = await findAllTasksByUserId(session?.user.id);
  }
  return (
    <>
      <SessionProvider>
        <NewTaskButton />
      </SessionProvider>

      <TaskList data={tasks} />
    </>
  );
}
