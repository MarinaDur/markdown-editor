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
