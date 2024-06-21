import { Link as MUILink } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useLogin } from "../../hooks/useLogin";
import { extractErrorMessage } from "../../utils/errors";
import Auth from "./Auth";

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
          const user = await createUser({
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
          $error(UNKNOWN_ERROR_MESSAGE);
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
