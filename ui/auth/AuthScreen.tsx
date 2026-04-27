"use client";

import { useState } from "react";
import { Button } from "../components/Button";
import { Queue, Stack } from "../components/Container";
import AuthBrand from "./brand/AuthBrand";
import AuthFormPanel from "./form-panel/AuthFormPanel";

export default function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <Queue className="min-h-screen bg-stone-50">
      {/* Left brand panel */}
      <AuthBrand />

      {/* Right form panel */}
      <Stack center className="flex-1 px-6 py-12 md:py-0">
        <Stack gap={8} className="w-full max-w-md">
          {/* Mode toggle */}
          <Queue
            itemsCenter
            gap={1}
            className="mx-auto w-fit rounded-lg border border-stone-200 bg-white p-1"
          >
            <Button
              variant={mode === "login" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("login")}
            >
              Sign in
            </Button>
            <Button
              variant={mode === "signup" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("signup")}
            >
              Create account
            </Button>
          </Queue>

          <AuthFormPanel mode={mode} setMode={setMode} />
        </Stack>
      </Stack>
    </Queue>
  );
}
