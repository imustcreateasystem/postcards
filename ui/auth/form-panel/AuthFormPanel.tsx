"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Copy, Check, Globe } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth/client";
import { cn } from "@/ui/utils/cn";
import { Input } from "@/ui/components/Input";
import { Label } from "@/ui/components/Label";
import { Button } from "@/ui/components/Button";
import { Stack, Queue } from "@/ui/components/Container";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

type Props = {
  mode: "login" | "signup";
  setMode: (m: "login" | "signup") => void;
};

const DEMO_CREDENTIALS = {
  email: "mira.okafor@commonplace.app",
  password: "postcard2026",
};

const fieldClass = cn(
  "w-full rounded px-3 py-1 h-9",
  "border border-stone-300 bg-stone-50 text-sm text-stone-700",
  "placeholder:text-stone-500",
  "hover:border-stone-500",
  "focus-visible:outline-none focus-visible:border-stone-500 focus-visible:ring-1 focus-visible:ring-stone-300",
  "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-500",
);

const errorClass = "mt-1 text-xs text-red-500";

export default function AuthFormPanel({ mode, setMode }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(
    null,
  );

  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: "", password: "", remember: false },
  });
  const signupForm = useForm<SignupFormData>({
    defaultValues: { name: "", email: "", password: "", terms: false },
  });

  const handleCopy = async (field: "email" | "password") => {
    await navigator.clipboard.writeText(DEMO_CREDENTIALS[field]);
    setCopiedField(field);
    loginForm.setValue(field, DEMO_CREDENTIALS[field]);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.remember,
      callbackURL: "/",
    });
    if (error) {
      toast.error("Invalid credentials — use the demo account below.");
      loginForm.setError("password", {
        message: error.message ?? "Check your email and password.",
      });
    } else {
      toast.success("Welcome back, Mira.", {
        description: "Taking you to your feed.",
      });
      router.push("/");
    }
    setIsLoading(false);
  };

  const handleSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? "Something went wrong. Please try again.");
    } else {
      toast.success("Account created!", {
        description: "Welcome to Commonplace.",
      });
      router.push("/");
    }
    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? "Google sign-in failed.");
      setIsLoading(false);
    }
    // on success, better-auth redirects automatically via callbackURL
  };

  return (
    <Stack
      gap={6}
      className="rounded border border-stone-200 bg-white px-8 py-7"
    >
      {/* Google OAuth */}
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        {/* Lucide has no Google brand icon; Globe is a neutral stand-in for wireframing */}
        <Globe className="size-4 text-stone-500" />
        Continue with Google
      </Button>

      {/* Divider */}
      <Queue itemsCenter gap={3}>
        <div className="h-px flex-1 bg-stone-200" />
        <span className="text-xs text-stone-500">or</span>
        <div className="h-px flex-1 bg-stone-200" />
      </Queue>

      {/* Login form */}
      {mode === "login" && (
        <Stack
          gap={5}
          as="form"
          onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
        >
          <Stack gap={1.5}>
            <Label htmlFor="login-email">Email address</Label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={cn(
                fieldClass,
                loginForm.formState.errors.email && "border-red-300",
              )}
              {...loginForm.register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email.",
                },
              })}
            />
            {loginForm.formState.errors.email?.message?.trim() && (
              <p className={errorClass}>
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </Stack>

          <Stack gap={1.5}>
            <Queue itemsCenter justifyBetween>
              <Label htmlFor="login-password">Password</Label>
              <button
                type="button"
                className="text-xs text-stone-500 hover:text-stone-600"
              >
                Forgot password?
              </button>
            </Queue>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              grow
              className={cn(
                loginForm.formState.errors.password && "border-red-300",
              )}
              {...loginForm.register("password", {
                required: "Password is required.",
                minLength: { value: 8, message: "At least 8 characters." },
              })}
            />
            {loginForm.formState.errors.password?.message && (
              <p className={errorClass}>
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </Stack>

          <Queue itemsCenter gap={2}>
            <input
              id="login-remember"
              type="checkbox"
              className="size-4 rounded border-stone-300 accent-stone-600 cursor-pointer"
              {...loginForm.register("remember")}
            />
            <Label
              htmlFor="login-remember"
              className="cursor-pointer select-none font-normal text-stone-500"
            >
              Keep me signed in
            </Label>
          </Queue>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in to Commonplace"
            )}
          </Button>

          <p className="text-center text-sm text-stone-500">
            New here?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="font-medium text-stone-600 hover:underline"
            >
              Create an account
            </button>
          </p>
        </Stack>
      )}

      {/* Signup form */}
      {mode === "signup" && (
        <Stack
          gap={5}
          as="form"
          onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
        >
          <Stack gap={1.5}>
            <Label htmlFor="signup-name">Your name</Label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="How should we address you?"
              className={cn(
                fieldClass,
                signupForm.formState.errors.name && "border-red-300",
              )}
              {...signupForm.register("name", {
                required: "Your name is required.",
                minLength: { value: 2, message: "At least 2 characters." },
              })}
            />
            {signupForm.formState.errors.name && (
              <p className={errorClass}>
                {signupForm.formState.errors.name.message}
              </p>
            )}
          </Stack>

          <Stack gap={1.5}>
            <Label htmlFor="signup-email">Email address</Label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={cn(
                fieldClass,
                signupForm.formState.errors.email && "border-red-300",
              )}
              {...signupForm.register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email.",
                },
              })}
            />
            {signupForm.formState.errors.email && (
              <p className={errorClass}>
                {signupForm.formState.errors.email.message}
              </p>
            )}
          </Stack>

          <Stack gap={1.5}>
            <Label htmlFor="signup-password">Password</Label>
            <p className="text-xs text-stone-500">At least 8 characters.</p>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="Choose something memorable"
              grow
              className={cn(
                signupForm.formState.errors.password && "border-red-300",
              )}
              {...signupForm.register("password", {
                required: "Password is required.",
                minLength: { value: 8, message: "At least 8 characters." },
              })}
            />
            {signupForm.formState.errors.password && (
              <p className={errorClass}>
                {signupForm.formState.errors.password.message}
              </p>
            )}
          </Stack>

          <Stack gap={1}>
            <Queue itemsStart gap={2}>
              <input
                id="signup-terms"
                type="checkbox"
                className="mt-0.5 size-4 rounded border-stone-300 accent-stone-600 cursor-pointer"
                {...signupForm.register("terms", {
                  required: "You must agree to continue.",
                })}
              />
              <Label
                htmlFor="signup-terms"
                className="cursor-pointer select-none font-normal leading-relaxed text-stone-500"
              >
                I agree to the{" "}
                <a href="#" className="text-stone-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-stone-600 hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </Queue>
            {signupForm.formState.errors.terms && (
              <p className={errorClass}>
                {signupForm.formState.errors.terms.message}
              </p>
            )}
          </Stack>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating your account…
              </>
            ) : (
              "Join Commonplace"
            )}
          </Button>

          <p className="text-center text-sm text-stone-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
              className="font-medium text-stone-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </Stack>
      )}

      {/* Demo credentials — login only */}
      {mode === "login" && (
        <Stack
          gap={3}
          className="rounded border border-stone-200 bg-stone-50 px-4 py-3"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Demo credentials
          </p>
          <Stack gap={2}>
            {(["email", "password"] as const).map((field) => (
              <Queue key={field} itemsCenter justifyBetween gap={3}>
                <Stack gap={0.5} className="min-w-0">
                  <p className="text-xs capitalize text-stone-500">{field}</p>
                  <p className="truncate font-mono text-xs text-stone-600">
                    {DEMO_CREDENTIALS[field]}
                  </p>
                </Stack>
                <button
                  type="button"
                  onClick={() => handleCopy(field)}
                  aria-label={`Copy ${field}`}
                  className="shrink-0 rounded p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-600"
                >
                  {copiedField === field ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </Queue>
            ))}
          </Stack>
          <p className="text-xs leading-relaxed text-stone-500">
            Click the copy icon to autofill each field, then sign in.
          </p>
        </Stack>
      )}
    </Stack>
  );
}
