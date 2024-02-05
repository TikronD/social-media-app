"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import "./toast.css";
import { useFormStatus } from "react-dom";

const ToastDemo = () => {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);
  const formStatus = useFormStatus();

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="Button large violet"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 800);
        }}
        type="submit"
        disabed={formStatus.pending}
      >
        {formStatus.pending ? "Creating post" : "Posts updated."}
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          You comment is created.
        </Toast.Title>
        <Toast.Description asChild></Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Creating Post"
        ></Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default ToastDemo;
