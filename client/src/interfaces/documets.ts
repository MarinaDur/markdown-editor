export interface MarkDownDocs {
  createdAt: string;
  name: string;
  content: string;
  _id: string;
  user?: string;
  __v?: boolean;
}

export interface Document {
  documents?: MarkDownDocs[] | undefined;
}

export interface UpdatedData {
  name?: string;
  content?: string;
}

export interface UpdateDocumentVariables {
  id?: string;
  name?: string;
  content?: string;
  createdAt?: string;
}

export interface UpdateDocumentResponse {
  status: string;
  data: {
    data: MarkDownDocs;
  };
}
