'use client';
import Link from "next/link";
import { useState } from "react";
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('User created successfully');
    } else {
      const errorData = await response.json();
      alert(errorData.msg || 'Error creating user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/image.jpg')] bg-cover bg-center">
      <Card className="mx-auto max-w-md bg-black bg-opacity-0 p-6 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <h2 className={title({ color: "green" })}>Resume Parser</h2>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="firstName"
                type="text"
                label="First Name"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                id="lastName"
                type="text"
                label="Last Name"
                variant="bordered"
                fullWidth
                clearable
                bordered
                required
                animated
                className="bg-transparent"
                value={formData.lastName}
                onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="bordered"
              fullWidth
              clearable
              bordered
              required
              animated
              className="bg-transparent"
              value={formData.confirmPassword}
              onChange={handleChange}
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