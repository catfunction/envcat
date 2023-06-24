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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Cat, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@src/components/ui/alert";

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
        <div className="h-screen flex items-center justify-center flex-col gap-5">
          <div className="flex flex-row gap-2 items-center text-2xl font-semibold">
            <Cat size={32} /> ENVCAT
          </div>
          <Card className="min-w-[400px]">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {signInError && (
                <Alert variant="destructive" className="p-2">
                  <AlertDescription>
                    Email or password does not match
                  </AlertDescription>
                </Alert>
              )}
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
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
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
