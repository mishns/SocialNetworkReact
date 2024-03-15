import { default as React, FC } from "react";

import { Button } from "@components/Button";
import { FormField } from "@components/FormField";
import styles from "./PostForm.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@api/QueryClient";
import { createPost } from "@api/Post";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface IPostFormProps {}
const createPostFormSchema = z.object({
  text: z
    .string()
    .min(10, "Длина поста должна составлять не менее 10 символов"),
});
type createPostForm = z.infer<typeof createPostFormSchema>;

export const PostForm: FC<IPostFormProps> = () => {
  const postMutation = useMutation(
    {
      mutationFn: createPost,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    },
    queryClient,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createPostForm>({
    resolver: zodResolver(createPostFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ text }) => {
        postMutation.mutate(text);
      })}
      className={styles.postForm}
    >
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea className={styles.postForm__input} {...register("text")} />
      </FormField>

      <Button
        type="submit"
        title="Опубликовать"
        isLoading={postMutation.isPending}
      />
    </form>
  );
};
