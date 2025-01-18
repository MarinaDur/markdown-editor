import axios from "axios";
import { UpdateDocumentVariables } from "../interfaces/documets";
import { Email, ResetToken, UserLogin, UserSignUp } from "../interfaces/users";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1`;
// console.log("BASE_URL", BASE_URL);

export async function fetchDocuments() {
  const response = await axios.get(`${BASE_URL}/documents/getUserDocs`, {
    withCredentials: true,
  });
  return response?.data?.data?.data; // Adjust based on your API's response structure
}

export async function fetchOneDocuments(docId: string) {
  const response = await axios.get(`${BASE_URL}/documents/${docId}`, {
    withCredentials: true,
  });
  return response; // Adjust based on your API's response structure
}

export async function updateDocument({
  id,
  name,
  content,
}: UpdateDocumentVariables): Promise<any> {
  const response = await axios.patch(
    `${BASE_URL}/documents/${id}`,
    { name, content },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    return response?.data?.data?.data; // Correct part of the API response to return
  }

  throw new Error("Failed to update document");
}

export async function createDocument({
  name,
  content,
}: UpdateDocumentVariables): Promise<any> {
  const response = await axios.post(
    `${BASE_URL}/documents/postDoc`,
    { name, content },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    return response?.data?.data?.document; // Correct part of the API response to return
  }

  throw new Error("Failed to create document");
}

export async function deleteDocument({
  id,
}: UpdateDocumentVariables): Promise<any> {
  const response = await axios.delete(
    `${BASE_URL}/documents/${id}`,

    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    return response?.data?.message;
  }

  throw new Error("Failed to delete document");
}

export async function login({ email, password }: UserLogin): Promise<any> {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    {
      email,
      password,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return response?.data;
}

export async function logout() {
  const response = await axios.get(`${BASE_URL}/users/logout`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  if (response.data.status === "success") {
    return response?.data?.message;
  }

  throw new Error("Unable to logout");
}

export async function authMe() {
  const response = await axios.get(`${BASE_URL}/users/getMe`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  if (response.data.status === "success") {
    return response?.data?.status;
  }

  throw new Error("User is not logged in");
}

export async function signup({
  userName,
  email,
  password,
  passwordConfirm,
}: UserSignUp): Promise<any> {
  const response = await axios.post(
    `${BASE_URL}/users/signup`,
    {
      name: userName,
      email,
      password,
      passwordConfirm,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return response?.data;
}

export async function forgotPassword({ email }: Email): Promise<any> {
  const response = await axios.post(
    `${BASE_URL}/users/forgotPassword`,
    {
      email,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return response;
}

export async function resetPassword({
  token,
  password,
  passwordConfirm,
}: ResetToken): Promise<any> {
  const response = await axios.patch(
    `${BASE_URL}/users/resetPassword/${token}`,
    {
      password,
      passwordConfirm,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return response;
}
