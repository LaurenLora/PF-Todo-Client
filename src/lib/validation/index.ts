import { Priority, Status } from "@/types";
import { nativeEnum, object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password required" }).min(
    1,
    "Password required"
  )
});

export const registerSchema = object({
  email: string({ required_error: "Email required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password required" })
    .min(1, "Password required")
    .min(6),
  firstName: string({ required_error: "First name required" })
    .min(1, "Password required")
    .min(2),
  lastName: string({ required_error: "Last name required" })
    .min(1, "Password required")
    .min(2)
});

export const createTaskSchema = object({
  title: string({ required_error: "Title required" })
    .nonempty("Title cannot be empty")
    .max(50, "Title must be less than 50 characters"),

  description: string({ required_error: "Description required" })
    .nonempty("Description cannot be empty")
    .max(250, "Description must be less than 250 characters"),

  priority: nativeEnum(Priority, {
    required_error: "Priority type is required"
  }).optional(),

  status: nativeEnum(Status, {
    required_error: "Status type is required"
  }).optional(),

  userId: string({ required_error: "User id required" }).nonempty(
    "User id cannot be empty"
  )
});
