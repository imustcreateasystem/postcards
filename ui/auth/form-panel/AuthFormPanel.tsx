type AuthFormPanelProps = {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
};

export default function AuthFormPanel({ mode }: AuthFormPanelProps) {
  return <>Form panel</>;
}
