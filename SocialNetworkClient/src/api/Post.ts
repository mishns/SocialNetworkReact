import { z } from "zod";
import { API_URL, REFERRER_POLICY } from "@constants";
import { validateResponse } from "@api/validateResponse";

const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});
const PostListSchema = z.array(PostSchema);
const FetchPostListSchema = z.object({
  list: PostListSchema,
});

export type Post = z.infer<typeof PostSchema>;
export type PostList = z.infer<typeof PostListSchema>;
export type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostList(): Promise<FetchPostListResponse> {
  return fetch(`${API_URL}/posts`)
    .then(response => response.json())
    .then(data => FetchPostListSchema.parse(data));
}

export function createPost(text: string): Promise<void> {
  return fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
    credentials: "include",
    mode: "cors",
    referrerPolicy: REFERRER_POLICY,
  })
    .then(validateResponse)
    .then(() => undefined);
}
