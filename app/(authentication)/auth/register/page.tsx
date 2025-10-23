"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiGoogleFill } from "@remixicon/react";
import { signIn } from "next-auth/react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface RegisterPageProps {
  heading?: string;
  buttonText?: string;
  googleText?: string;
}

const RegisterPage = ({
  heading = "Sign Up",
  buttonText = "Sign Up",
  googleText = "Login with Google",
}: RegisterPageProps) => {
  // Zod schema for validation
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form Data:", values);

    // Example fetch to backend
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <section className="bg-muted h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        {heading && <h1 className="text-2xl font-bold">{heading}</h1>}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full bg-background border rounded-lg px-6 py-8 shadow-lg"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
            >
              {buttonText}
            </Button>

            {/* Google Login */}
            <Button
              type="button"
              onClick={() => signIn("google")}
              className="w-full bg-[#DB4437] text-white hover:bg-[#DB4437]/90 flex items-center justify-center gap-2"
            >
              <RiGoogleFill className="opacity-70" size={16} />
              {googleText}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RegisterPage;
