import FormWrapper from "@/components/authentication/FormWrapper";
import LoginForm from "@/components/authentication/LoginForm";
import React from "react";

const page = () => {
  return (
    <FormWrapper
      title="Welcome Back!"
      description="Login to your dashboard"
      isLogin={true}
    >
      <LoginForm />
    </FormWrapper>
  );
};

export default page;
