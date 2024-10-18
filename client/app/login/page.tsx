"use client";
import Link from "next/link";
import { Button } from "@nextui-org/react"; // Importing Button from Next UI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; // Importing Card components from Next UI
import { Input } from "@nextui-org/react"; // Importing Input from Next UI
import { GithubIcon } from "@/components/icons"; // Adjust the import path as necessary

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-black">
      <Card className="mx-auto max-w-sm bg-transparent">
        <CardHeader>
          <h2 className="text-2xl text-green-500">Resume Parser</h2>
          <p className="text-gray-400">
            Enter your email below to login to your account
          </p>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                fullWidth
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Password</span>
                <Link
                  href="#"
                  className="text-sm underline text-gray-400 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                fullWidth
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Login
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              Login with Google
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <GithubIcon className="w-5 h-5 mr-2" />
              Login with GitHub
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <div className="mt-4 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline text-green-500">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
