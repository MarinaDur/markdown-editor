import axios from "axios";
import {
  UpdatedData,
  UpdateDocumentResponse,
  UpdateDocumentVariables,
} from "../interfaces/documets";
import { MarkDownDocs } from "../context/MarkdownContext";

export async function fetchDocuments() {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
    {
      withCredentials: true,
    }
  );
  return response.data.data.data; // Adjust based on your API's response structure
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
    return response.data.data.data; // Correct part of the API response to return
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
    return response.data.data.data.document; // Correct part of the API response to return
  }

  throw new Error("Failed to update document");
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
    return response.data.message;
  }

  throw new Error("Failed to delete document");
}

export async function login(email: string, password: string) {
  // try {
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

  return response.data;

  // if (
  //   response?.data?.status === "success" &&
  //   response?.data?.data?.user?._id
  // ) {
  //   const docResponse = await axios.get(
  //     "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   setDocuments(docResponse?.data?.data?.data);
  //   setCurrentDocId(docResponse?.data?.data?.data[currentDocId || 0]._id);
  //   setIsLoggedIn(true);
  // navigate("/markdown");
  // }
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     setIsLoggedIn(false);

  //     handleError(error.response?.data?.message);
  //     console.log(error.response);
  //   } else {
  //     setIsLoggedIn(false);

  //     handleError("An unexpected error occurred");
  //     console.error("An unexpected error occurred:", error);
  //   }
  // } finally {
  //   setIsLoading(false);
  //   setEmail("");
  //   setPassword("");
}
