"use client";
import { useFormStatus } from "react-dom";

export default function AddPostButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Creating post" : "Posts updated."}
    </button>
  );
}
