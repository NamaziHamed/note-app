import FormWrapper from "@/components/authentication/FormWrapper";
import RegisterForm from "@/components/authentication/RegisterForm";
import React from "react";

const page = () => {
  return (
    <FormWrapper
      title="Create Account"
      description="Welcome to Apex Agenda"
      isLogin={false}
    >
      <RegisterForm />
    </FormWrapper>
  );
};

export default page;
