/* Third-party imports. */
import { createAuthClient } from "better-auth/react";

/* Expose methods of the auth client. */
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  updateUser,
  deleteUser,
  changeEmail,
  changePassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  requestPasswordReset,
  linkSocial,
} = createAuthClient({});
