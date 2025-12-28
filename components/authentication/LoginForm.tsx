"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { loginProps, loginSchema } from "@/utils/authValidations";
import { registerWithCredentials as register } from "@/utils/authActions";

const LoginForm = () => {
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<loginProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginProps) => {
    try {
      await register(data);
      await update();
      toast.success(`Logged in with ${data.email}`);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email: </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Password: </FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full mb-4 cursor-pointer"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
