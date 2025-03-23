import TaskList from "@/components/dashboard/TaskList";
import { findAllTasksByUserId } from "@/lib/api/taskApi";
import { auth } from "@/lib/auth";
import { Task } from "@/types";
import React from "react";

export const revalidate = 10;

export default async function Page() {
  const session = await auth();

  let tasks: Task[] = [];
  if (session) {
    tasks = await findAllTasksByUserId(session?.user.id);
  }
  return (
    <>
      <TaskList data={tasks} />
    </>
  );
}
