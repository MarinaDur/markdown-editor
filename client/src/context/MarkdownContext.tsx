import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { MarkDownDocs } from "../interfaces/documets";

interface MarkdownContextProps {
  isMenuOpen: boolean;
  handleToggleMenu: () => void;
  markdownValue: string;
  handleEditor: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isPreview: boolean;
  handleShowPreview: () => void;
  handleCurrentDoc: (
    docIndex: number,
    docId: string,
    documents: MarkDownDocs[]
  ) => void;
  currentDoc: number | undefined;
  docNameValue: string | undefined;
  handleChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteDocPopup: () => void;
  deleteDocPopup: boolean;
  handleCloseDeleteDocPopup: () => void;
  handleDarkMode: () => void;
  isDarkMode: boolean;
  email: string | null;
  password: string | null;
  passwordConfirm: string | null;
  userName: string | null;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUserName: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  handleError: (err: string | null) => void;
  handleErrorReset: () => void;
  setDocNamevalue: (docName: string) => void;
  setCurrentDoc: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentDocId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setMarkdownValue: React.Dispatch<React.SetStateAction<string>>;
  currentDocId: string | undefined;
  setDeleteDocPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string | null>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
}

// export interface MarkDownDocs {
//   createdAt: string;
//   name: string;
//   content: string;
//   _id: string;
// }

interface MarkdownProviderProps {
  children: ReactNode;
}

const MarkdownContext = createContext<MarkdownContextProps | undefined>(
  undefined
);

function MarkdownProvider({ children }: MarkdownProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [markdownValue, setMarkdownValue] = useState<string>("");
  const [currentDoc, setCurrentDoc] = useState<number | undefined>(
    () => Number(localStorage.getItem("currentDoc")) || 0
  );
  const [currentDocId, setCurrentDocId] = useState<string | undefined>("");
  const [docNameValue, setDocNamevalue] = useState<string | undefined>("");
  const [deleteDocPopup, setDeleteDocPopup] = useState<boolean>(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
    (docIndex: number, docId: string, documents: MarkDownDocs[]) => {
      sessionStorage.setItem("currentDoc", `${docIndex}`);
      setCurrentDoc(docIndex);
      setCurrentDocId(docId);
      setMarkdownValue(documents[docIndex]?.content);
      setIsMenuOpen(false);
      setDocNamevalue(documents[docIndex]?.name);
    },
    []
  );

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
  function handleUserName(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  function handleDeleteDocPopup() {
    setDeleteDocPopup(true);
  }

  function handleCloseDeleteDocPopup() {
    setDeleteDocPopup(false);
  }

  function handleError(err: string | null) {
    setError(err);
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

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

  const contextValue: MarkdownContextProps = {
    isMenuOpen,
    handleToggleMenu,
    markdownValue,
    handleEditor,
    isPreview,
    handleShowPreview,
    handleCurrentDoc,
    currentDoc,
    docNameValue,
    handleChangeName,
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
    error,
    handleError,
    handleErrorReset,
    setCurrentDocId,
    setMarkdownValue,
    setCurrentDoc,
    currentDocId,
    setDocNamevalue,
    setDeleteDocPopup,
    setEmail,
    setPassword,
    userName,
    handleUserName,
    setPasswordConfirm,
    setUserName,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
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
