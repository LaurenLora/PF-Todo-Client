import { API } from "@/services/axios";
import { RegisterFormType } from "@/types";
import { registerSchema } from "../validation";

export const handleRegister = async (credentials: RegisterFormType) => {
  try {
    const data = await registerSchema.parseAsync(credentials);
    console.log(data);
    const res = await API.post("/users/register", {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
