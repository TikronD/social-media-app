"use client";
import { Button } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Creating Profile" : "Save Profile"}
    </Button>
  );
}
