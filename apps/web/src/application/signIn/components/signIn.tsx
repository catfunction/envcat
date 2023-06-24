"use client";

import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Input } from "@src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { signIn as SignInAuth } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const SignIn = () => {
  const router = useRouter();
  const [signInError, setSignInError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await SignInAuth("credentials", {
      ...values,
      redirect: false,
    });

    if (response.error === "InvalidCredentials") {
      setSignInError(true);
      return;
    }

    router.replace("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="h-screen flex items-center justify-center flex-col">
          <Card className="min-w-[400px]">
            <CardHeader>
              <CardTitle className="text-center">EnvCat</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {signInError && <p>Invalid credentials</p>}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
