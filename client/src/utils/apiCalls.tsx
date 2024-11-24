import axios from "axios";

export async function fetchDocuments() {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
    {
      withCredentials: true,
    }
  );
  return response.data.data.data; // Adjust based on your API's response structure
}
