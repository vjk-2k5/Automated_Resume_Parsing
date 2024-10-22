'use client';
import Link from "next/link";
import { Button, Input, Spacer } from "@nextui-org/react"; // Importing Button, Input, and Spacer from Next UI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card"; // Importing Card components from Next UI
import { FaGoogle } from "react-icons/fa"; // Importing Google icon from react-icons
import { GithubIcon } from "@/components/icons"; // Importing GithubIcon from the correct path
import { title } from "@/components/primitives";

export const description =
  "A sign-up form with first name, last name, email, password, and confirm password. There's an option to sign up with Google and GitHub.";

export default function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto max-w-md bg-black bg-opacity-0 p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "green" })}>Resume Parser</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="first-name"
                type="text"
                label="First Name"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
              />
              <Input
                id="last-name"
                type="text"
                label="Last Name"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
              />
            </div>
            <Input
              id="email"
              type="email"
              label="Email"
              variant="bordered"
              fullWidth
              clearable
              bordered
              required
              animated
              className="bg-transparent"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              variant="bordered"
              fullWidth
              clearable
              bordered
              required
              animated
              className="bg-transparent"
            />
            <Input
              id="confirm-password"
              type="password"
              label="Confirm Password"
              variant="bordered"
              fullWidth
              clearable
              bordered
              required
              animated
              className="bg-transparent"
            />
            <Button 
              type="submit" 
              className="mt-3 border border-white-500" 
              color="gradient" 
              auto
            >
              Sign Up
            </Button>
            <div className="flex items-center my-3">
              <hr className="flex-grow border-t border-gray-500" />
              <span className="mx-2 text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-500" />
            </div>
            <Button
              type="button"
              className="mt-2 border border-white-500 flex items-center justify-center"
              color="gradient"
              auto
            >
              <GithubIcon className="mr-2" />
              Sign Up with GitHub
            </Button>
            <Button
              type="button"
              className="mt-2 border border-white-500 flex items-center justify-center"
              color="gradient"
              auto
            >
              <FaGoogle className="mr-2" />
              Sign Up with Google
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-green-300">Login</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}