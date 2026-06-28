"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { addToken, addUser, checkUsernameExist } from "../services/users";
import { getCurrentUser } from "../services/sessions";
import { revalidatePath } from "next/cache";

export type RegisterFormState = {
  errors: {
    username: string;
    name: string;
    password: string;
  };
  values: {
    username: string;
    name: string;
  };
};
export const registerUser = async (
  prevState: RegisterFormState,
  formData: FormData,
) => {
  console.log("FormData keys:", Array.from(formData.keys()));
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const passwordHash = await bcrypt.hash(password, 10);
  const errors: RegisterFormState["errors"] = {
    username: "",
    name: "",
    password: "",
  };
  const isUsername = await checkUsernameExist(username);
  if (!username || username.length < 4) {
    errors.username = "username must be at least 4 characters long";
  }
  if (isUsername) {
    errors.username =
      "this username is already exist, please choose another one";
  }
  if (!name) {
    errors.name = "name can not be empty";
  }
  if (!password || password.length < 4) {
    errors.password = "password must be at least 4 characters long";
  }
  if (password !== confirmPassword) {
    errors.password = "Passwords do not match.";
  }

  const hasErrors = Object.values(errors).some((error) => error !== "");
  if (hasErrors) {
    return { errors, values: { username, name } };
  }
  console.log("Validation passed, attempting to add user...");
  
    await addUser(username, name, passwordHash);
    console.log("User added successfully, redirecting...");
    redirect("/login");
  
};

export const createToken = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const token = crypto.randomUUID();
  await addToken(user.id, token);
  revalidatePath("/me");
};
