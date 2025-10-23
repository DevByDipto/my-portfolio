"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession, signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface LoginPageProps {
  heading?: string;
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
}

const LoginPage = ({
  heading = "Login",
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
}: LoginPageProps) => {
  const { data: session } = useSession();
  console.log({session});

  // Zod schema
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Login Data:", values);
try {
      const res = await signIn("credentials", { ...values, callbackUrl: "/dashboard" });
    
} catch (error) {
  console.log(error);
  
}
    // Example: call backend
    
 

  };

  return (
    <section className="bg-muted h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        {heading && <h1 className="text-2xl font-bold">{heading}</h1>}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full bg-background border rounded-lg px-6 py-8 shadow-md"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              {buttonText}
            </Button>
          </form>
        </Form>

        <div className="text-muted-foreground flex justify-center gap-1 text-sm">
          <p>{signupText}</p>
          <a
            href={signupUrl}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
