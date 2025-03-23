"use server";

import { CreateTaskType } from "@/types";
import { AuthAPI } from "@/services/axios";
import { createTaskSchema } from "../validation";
import { auth } from "../auth";

export const addTask = async (task: CreateTaskType) => {
  try {
    const session = await auth();
    if (!session) return;
    const newTask = { ...task, userId: session.user.id };
    const data = await createTaskSchema.parseAsync(newTask);
    const newData = { ...data, userId: session.user.id };

    const res = await AuthAPI.post("/tasks/create", {
      title: newData.title,
      description: newData.description,
      userId: newData.userId,
      status: newData.status,
      priority: newData.priority
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const findAllTasksByUserId = async (userId: string) => {
  try {
    const res = await AuthAPI.get(`/tasks/tasks/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
