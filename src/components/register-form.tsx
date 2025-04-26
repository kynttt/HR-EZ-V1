// src/components/register-form.tsx
"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  const { register, handleSubmit } = useForm<RegisterData>();
  const onSubmit = (data: RegisterData) => {
    console.log("register:", data);
    // TODO: call your sign-up API here
  };

  return (
        <div
          className={cn(
            "w-full max-w-sm mx-auto flex flex-col gap-6",
            className
          )}
          {...props}
        >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Sign up with your email or continue with Apple / Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {/* Social Buttons */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <FaApple className="mr-2" /> Continue with Apple
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <FaGoogle className="mr-2" /> Continue with Google
                </Button>
              </div>

              {/* OR divider */}
              <div className="relative text-center text-sm">
                <span className="bg-card text-muted-foreground px-2 relative z-10">
                  Or sign up with email
                </span>
                <div className="absolute inset-0 top-1/2 border-t border-border"></div>
              </div>

              {/* Email & Password Fields */}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    {...register("confirmPassword")}
                  />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>

              {/* Link to Sign In */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/sign-in" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Terms */}
      <div className="text-center text-xs text-muted-foreground space-x-1">
        <span>By signing up, you agree to our</span>
        <a href="#" className="underline">
          Terms of Service
        </a>
        <span>and</span>
        <a href="#" className="underline">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
