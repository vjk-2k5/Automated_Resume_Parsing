"use client"

import { Button } from "@nextui-org/react"
import { Textarea } from "@nextui-org/react"
import { Tooltip } from "@nextui-org/react"
import { useRef, useState } from "react"
import {title } from "@/components/primitives"

export default function Component() {
  const fileInputRef = useRef(null)
  const [userInput, setUserInput] = useState("")
  const [showPrompt, setShowPrompt] = useState(true)
  const [submittedInput, setSubmittedInput] = useState(null)

  const handleFileUpload = () => {
    fileInputRef.current.click()
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
    if (e.target.value) {
      setShowPrompt(false) // Hide prompt when user types
    } else {
      setShowPrompt(true) // Show prompt again if textarea is empty
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission
    setSubmittedInput(userInput) // Store the submitted input
    setUserInput("") // Clear the textarea
    setShowPrompt(false) // Optionally keep the prompt hidden after submission
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        {showPrompt && (
          <div className="inline-block max-w-xl text-center mb-4">
            <span className={title()}>How to use the 
            <span className={title({ color: "green" })}> Resume Parser</span> ?</span>
            <br />
            <span className="text-lg">
              Upload a PDF resume or paste the text here for parsing.
            </span>
          </div>
        )}
        {submittedInput && (
          <div className="mt-4">
            <p className="text-lg">User Input: {submittedInput}</p>
            {/* You can display the output here if needed */}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative flex flex-col mb-4">
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={userInput}
          onChange={handleInputChange}
        />
        <div className="flex items-center mt-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            // Add onChange handler here if needed
          />
          <Tooltip content="Attach File">
            <Button
              variant="light"
              size="sm"
              onClick={handleFileUpload}
              className="mr-2"
            >
              📎
            </Button>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  )
}
