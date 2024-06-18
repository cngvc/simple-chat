import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";

const Signup = () => {
  const [createUser] = useCreateUser();
  const { login } = useLogin();

  const [error, $error] = useState("");

  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async ({ email, password }) => {
        try {
          $error("");
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          await login({ email, password });
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            $error(errorMessage);
            return;
          }
          $error("Unknown error occurred");
        }
      }}
      error={error}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
