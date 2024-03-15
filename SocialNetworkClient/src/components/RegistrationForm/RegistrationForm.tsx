import { default as React, FC, FormEventHandler, useState } from "react";

import { FormField } from "../FormField";
import { Button } from "../Button";
import styles from "./RegistrationForm.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@api/User";
import { queryClient } from "@api/QueryClient";

export const RegistrationForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registrationMutation = useMutation(
    {
      mutationFn: () => registerUser(username, password),
    },
    queryClient,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    registrationMutation.mutate();
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={event => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      <Button
        type="submit"
        title="Зарегистрироваться"
        isLoading={registrationMutation.isPending}
      />
    </form>
  );
};
