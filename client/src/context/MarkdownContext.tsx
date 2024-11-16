import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  ChangeEventHandler,
} from "react";
import axios from "axios";
import data from "../data/data.json";

const docsData: MarkDownDocs[] = [
  {
    createdAt: data[0].createdAt,
    name: data[0].name,
    content: data[0].content,
  },
  {
    createdAt: data[1].createdAt,
    name: data[1].name,
    content: data[1].content,
  },
];

interface MarkdownContextProps {
  isMenuOpen: boolean;
  handleToggleMenu: () => void;
  markdownValue: string;
  handleEditor: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isPreview: boolean;
  handleShowPreview: () => void;
  documents: MarkDownDocs[];
  handleCurrentDoc: (docIndex: number) => void;
  currentDoc: number | undefined;
  handleAddNewDoc: () => void;
  docNameValue: string | undefined;
  handleChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  deleteDoc: () => void;
  handleSaveMarkdown: () => void;
  handleDeleteDocPopup: () => void;
  deleteDocPopup: boolean;
  handleCloseDeleteDocPopup: () => void;
  handleDarkMode: () => void;
  isDarkMode: boolean;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (
    e: React.FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => void;
  error: string | null;
  handleError: (err: string | null) => void;
  handleErrorReset: () => void;
  isLoading: boolean;
}

export interface MarkDownDocs {
  createdAt: string;
  name: string;
  content: string;
}

interface MarkdownProviderProps {
  children: ReactNode;
}

const MarkdownContext = createContext<MarkdownContextProps | undefined>(
  undefined
);

function MarkdownProvider({ children }: MarkdownProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [documents, setDocuments] = useState<MarkDownDocs[]>(docsData);
  const [markdownValue, setMarkdownValue] = useState<string>(
    documents[1]?.content
  );
  const [currentDoc, setCurrentDoc] = useState<number | undefined>(1);
  const [docNameValue, setDocNamevalue] = useState<string | undefined>(
    documents[1]?.name
  );
  const [isNewDocumentAdded, setNewDocumentAdded] = useState<boolean>(false);
  const [isDocDeleted, setIsDocDeleted] = useState<boolean>(false);
  const [deleteDocPopup, setDeleteDocPopup] = useState<boolean>(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(
    "test1112223@gmail.com"
  );
  const [password, setPassword] = useState<string | undefined>("123Pass123");
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>(
    ""
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedin, setLogIn] = useState<boolean>(false);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleShowPreview() {
    setIsPreview((prev) => !prev);
  }

  function handleEditor(e: ChangeEvent<HTMLTextAreaElement>) {
    setMarkdownValue(e.target.value);
  }

  const handleCurrentDoc = useCallback(
    (docIndex: number) => {
      console.log(docIndex);
      setCurrentDoc(docIndex);
      setMarkdownValue(documents[docIndex]?.content);
      setIsMenuOpen(false);
      setDocNamevalue(documents[docIndex]?.name);
    },
    [documents]
  );

  function handleAddNewDoc() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}-${day}-${year}`;

    setDocuments((prev) => {
      const numbers = prev.map((doc) => {
        const match = doc.name.match(/untitled-document-(\d+)\.md/);
        return match ? parseInt(match[1]) : 0;
      });

      // Finding the maximum number
      const maxNumber = Math.max(...numbers);

      // Incrementing the number for the new document
      const newDocNumber = maxNumber + 1;
      const newDocs = [
        {
          createdAt: formattedDate,
          name: `untitled-document-${newDocNumber}.md`,
          content: "",
        },
        ...prev,
      ];

      // Perform the subsequent action after the state update
      setNewDocumentAdded(true);
      return newDocs;
    });
  }

  useEffect(() => {
    if (isNewDocumentAdded) {
      handleCurrentDoc(0);
      setNewDocumentAdded(false);
    }
  }, [isNewDocumentAdded, handleCurrentDoc]);

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setDocNamevalue(e.target.value);
  }

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(e.target.value);
  }
  function handlePasswordConfirm(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPasswordConfirm(e.target.value);
  }

  function handleInputBlur() {
    setDocuments((prev) => {
      const updatedDocs = [...prev];
      updatedDocs[currentDoc ?? 0].name = docNameValue ?? "";
      return updatedDocs;
    });
  }

  function handleDeleteDocPopup() {
    if (documents.length > 0) {
      setDeleteDocPopup(true);
    } else return;
  }

  function handleCloseDeleteDocPopup() {
    setDeleteDocPopup(false);
  }

  function deleteDoc() {
    setIsDocDeleted(true);

    setDocuments((prev) => {
      const updatedDocs = [...prev];
      const updatedCurrentDoc = currentDoc ?? 0;
      updatedDocs.splice(updatedCurrentDoc, 1);

      return updatedDocs;
    });
    setDeleteDocPopup(false);
  }

  useEffect(() => {
    if (isDocDeleted) {
      const updatedCurrentDoc = currentDoc ?? 0;

      const newCurrentDoc = updatedCurrentDoc > 0 ? updatedCurrentDoc - 1 : 0;

      if (documents.length > 0) {
        handleCurrentDoc(newCurrentDoc);
      } else {
        setMarkdownValue("");
        setDocNamevalue("");
      }
    }
    setIsDocDeleted(false);
  }, [currentDoc, documents.length, handleCurrentDoc, isDocDeleted]);

  function handleSaveMarkdown() {
    setDocuments((prev) => {
      const updatedDocs = [...prev];
      updatedDocs[currentDoc ?? 0].content = markdownValue ?? "";
      return updatedDocs;
    });
  }

  // async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //       credentials: "include", // Include cookies
  //     });

  //     const data = await response.json(); // Get JSON data from the response

  //     // Check if login was successful
  //     if (data?.status === "success" && data?.data?.user?._id) {
  //       // Fetch the documents if login is successful
  //       const docResponse = await fetch(
  //         "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
  //         {
  //           method: "GET",
  //           credentials: "include", // Include cookies for the protected route
  //         }
  //       );

  //       const docData = await docResponse.json(); // Get document data from the response
  //       console.log("Documents data:", docData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function handleError(err: string | null) {
    setError(err);
  }

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(Object.keys(response.headers));

      if (
        response?.data?.status === "success" &&
        response?.data?.data?.user?._id
      ) {
        setTimeout(async () => {
          const docResponse = await axios.get(
            "http://127.0.0.1:8000/api/v1/documents/getUserDocs",
            {
              withCredentials: true,
            }
          );

          console.log(docResponse);
        }, 2000);
        // navigate("/markdown");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data?.message);
        console.log(error.response);
      } else {
        handleError("An unexpected error occurred");
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  }

  useEffect(function () {});

  function handleErrorReset() {
    if (error !== null) {
      setError(null);
    }
  }

  function handleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  console.log(error);

  const contextValue: MarkdownContextProps = {
    isMenuOpen,
    handleToggleMenu,
    markdownValue,
    handleEditor,
    isPreview,
    handleShowPreview,
    documents,
    handleCurrentDoc,
    currentDoc,
    handleAddNewDoc,
    docNameValue,
    handleChangeName,
    handleInputBlur,
    deleteDoc,
    handleSaveMarkdown,
    handleDeleteDocPopup,
    deleteDocPopup,
    handleCloseDeleteDocPopup,
    handleDarkMode,
    isDarkMode,
    email,
    password,
    passwordConfirm,
    handleEmail,
    handlePassword,
    handlePasswordConfirm,
    handleLogin,
    error,
    handleError,
    handleErrorReset,
    isLoading,
  };

  return (
    <MarkdownContext.Provider value={contextValue}>
      {children}
    </MarkdownContext.Provider>
  );
}

function useMarkdown() {
  const context = useContext(MarkdownContext);
  if (context === undefined)
    throw new Error("MarkdownContext was used outside of the MarkdownProvider");
  return context;
}

export { MarkdownProvider, useMarkdown };
