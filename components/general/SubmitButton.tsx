"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-fit" type="submit">
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
}
