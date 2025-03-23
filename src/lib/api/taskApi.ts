"use server";

import { CreateTaskType, Task } from "@/types";
import { AuthAPI } from "@/services/axios";
import { createTaskSchema, updateTaskSchema } from "../validation";
import { auth } from "../auth";

export const addTask = async (task: CreateTaskType) => {
  try {
    const session = await auth();
    if (!session) return;
    const newTask = { ...task, userId: session.user.id };
    const data = await createTaskSchema.parseAsync(newTask);
    const { title, description, userId, status, priority } = {
      ...data,
      userId: session.user.id
    };

    console.log(
      typeof title,
      typeof description,
      typeof userId,
      typeof status,
      typeof priority
    );

    const res = await AuthAPI.post("/tasks/create", {
      title,
      description,
      userId,
      status,
      priority
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const findAllTasksByUserId = async (userId: string) => {
  try {
    const res = await AuthAPI.get(`/tasks/tasks/${userId}`); // api de mi yoksa burada mı

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editTask = async (taskId: string, task: Partial<Task>) => {
  try {
    const session = await auth();

    if (!session) return;

    const data = { ...task, userId: session.user.id };

    const newData = await updateTaskSchema.parseAsync(data);

    const res = await AuthAPI.post(`/tasks/update/${taskId}`, {
      title: newData.title,
      description: newData.description,
      userId: newData.userId,
      status: newData.status,
      priority: newData.priority
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = async (id: string) => {
  try {
    const res = await AuthAPI.get(`/tasks/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const attachFileToTask = async (taskId: string, files: File[]) => {
  if (files.length === 0) return;

  const formData = new FormData();
  console.log("girdi");

  for (const file of files) {
    console.log(file);
    formData.append("files", file);
  }

  try {
    const res = await AuthAPI.post(`/tasks/attach/${taskId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log("girdi22");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeTask = async (taskId: string) => {
  try {
    const res = await AuthAPI.delete(`/tasks/${taskId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addThumbnailToTask = async (taskId: string, file: File) => {
  if (!file) return;
  const formData = new FormData();
  try {
    formData.append("file", file);
    const res = await AuthAPI.post(`/tasks/thumbnail/${taskId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
