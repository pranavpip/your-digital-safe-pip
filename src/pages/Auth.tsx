import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  if (isLogin) {
    return (
      <AuthLayout
        title="Welcome Back"
        subtitle="Sign in to access your private link collection"
      >
        <LoginForm onSwitchToSignup={switchToSignup} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start building your personal bookmark vault"
    >
      <SignupForm onSwitchToLogin={switchToLogin} />
    </AuthLayout>
  );
};