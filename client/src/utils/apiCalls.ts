import axios from "axios";
import { UpdateDocumentVariables } from "../interfaces/documets";
import { UserLogin, UserSignUp } from "../interfaces/users";

const url = "http://127.0.0.1:8000";

export async function fetchDocuments() {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
    {
      withCredentials: true,
    }
  );
  return response?.data?.data?.data; // Adjust based on your API's response structure
}

export async function fetchOneDocuments(docId: string) {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/v1/documents/${docId}`,
    {
      withCredentials: true,
    }
  );
  return response; // Adjust based on your API's response structure
}

export async function updateDocument({
  id,
  name,
  content,
}: UpdateDocumentVariables): Promise<any> {
  const response = await axios.patch(
    `http://127.0.0.1:8000/api/v1/documents/${id}`,
    { name, content },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    console.log("response from patch", response);
    return response?.data?.data?.data; // Correct part of the API response to return
  }

  throw new Error("Failed to update document");
}

export async function createDocument({
  name,
  content,
}: UpdateDocumentVariables): Promise<any> {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/v1/documents/postDoc`,
    { name, content },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    console.log("response from patch", response);
    return response?.data?.data?.document; // Correct part of the API response to return
  }

  throw new Error("Failed to create document");
}

export async function deleteDocument({
  id,
}: UpdateDocumentVariables): Promise<any> {
  const response = await axios.delete(
    `http://127.0.0.1:8000/api/v1/documents/${id}`,

    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    console.log("response from patch", response);
    return response?.data?.message;
  }

  throw new Error("Failed to delete document");
}

export async function login({ email, password }: UserLogin): Promise<any> {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/v1/users/login",
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
  const response = await axios.get(
    "http://127.0.0.1:8000/api/v1/users/logout",
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    console.log("response from patch", response);
    return response?.data?.message;
  }

  throw new Error("Unable to logout");
}

export async function authMe() {
  const response = await axios.get("http://127.0.0.1:8000/api/v1/users/getMe", {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  if (response.data.status === "success") {
    console.log("response from patch", response);
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
    "http://127.0.0.1:8000/api/v1/users/signup",
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

export async function createDefaultDocs() {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/v1/documents/createDefaultDocsOnSignup",
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  if (response.data.status === "success") {
    console.log("response from patch", response);
    return response?.data?.status;
  }

  throw new Error("Couldn't create documents ");
}
