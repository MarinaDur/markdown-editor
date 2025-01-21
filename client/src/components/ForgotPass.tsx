import LoginSignupTemp from "../ui/LoginSignupTemp";
import LabelInput from "../ui/LabelInput";
import Input from "../ui/Input";
import { useMarkdown } from "../context/MarkdownContext";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../utils/apiCalls";
import axios from "axios";
import ErrorPopUp from "../ui/ErrorPopUp";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const { email, handleEmail, handleError, setEmail } = useMarkdown();

  const navigate = useNavigate();

  const forgotPassMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      navigate("/success-message", {
        state: {
          message: "Please check your email for the reset link",
        },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data?.message);
      } else {
        handleError("An unexpected error occurred");
      }
    },
    onSettled: () => {
      setEmail("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    forgotPassMutation.mutate({ email });
  }
  return (
    <LoginSignupTemp
      welcomeText="Forgot Password"
      descText="Get a reset password link to your email"
      buttonText="Send reset link"
      handleClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
      isLoading={forgotPassMutation.isPending}
    >
      <LabelInput name="Email:" htmlFor="email" />
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email address"
        value={email || ""}
        handleChange={handleEmail}
      />
      <ErrorPopUp />
    </LoginSignupTemp>
  );
}

export default ForgotPass;
