"use client"

import { Button } from "@nextui-org/react"
import { Textarea } from "@nextui-org/react"
import { Tooltip } from "@nextui-org/react"
import { Skeleton } from "@nextui-org/react"
import { PaperClipIcon } from "@heroicons/react/24/outline" // Import PaperClip icon
import { useRef, useState } from "react"
import { title } from "@/components/primitives"

export default function Component() {
  const fileInputRef = useRef(null)
  const [userInput, setUserInput] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [submittedInput, setSubmittedInput] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true) // State for showing the instructions

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowInstructions(false) // Hide the instructions after submission
    setSubmittedInput(userInput)
    setUserInput("")
    setResponse(null)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setResponse(`Parsed data from your resume: ${userInput}`)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Conditionally render the instruction content */}
      {showInstructions && (
        <div className="flex-grow flex items-center justify-center">
          <div className="inline-block max-w-xl text-center mb-4">
            <span className={title()}>How to use the
              <span className={title({ color: "green" })}> Resume Parser</span>?
            </span>
            <br />
            <span className="text-lg">
              Upload a PDF resume or paste the text here for parsing.
            </span>
          </div>
        </div>
      )}

      {/* This section stays even after submission */}
      <div className="flex-grow flex flex-col items-start justify-start overflow-y-auto mb-4 space-y-4">
        {submittedInput && (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg self-end w-fit shadow-md">
            <p>Given Resume: {submittedInput}</p>
          </div>
        )}

        {isLoading && (
          <div className="w-full max-w-xl">
            <Skeleton height="40px" />
            <Skeleton height="40px" className="mt-2" />
          </div>
        )}

        {response && (
          <div className="bg-gradient-to-r from-gray-800 to-black text-white p-3 rounded-lg self-start w-fit shadow-md">
            <p>{response}</p>
          </div>
        )}
      </div>

      {/* Form to handle file upload and user input */}
      <form onSubmit={handleSubmit} className="relative flex flex-col mb-16">
        <Textarea
          id="message"
          placeholder="Paste your resume text here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" // Original textarea styling
          value={userInput}
          onChange={handleInputChange}
        />
        <div className="flex items-center mt-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          {uploadedFile && (
            <div>
              📄 {uploadedFile}
            </div>
          )}
          <Tooltip content="Attach File">
            <Button
              variant="light"
              size="sm"
              onClick={() => fileInputRef.current.click()}
              className="mr-2"
            >
              <PaperClipIcon className="h-5 w-5 text-gray-700" />
            </Button>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto">
            Upload Resume
          </Button>
        </div>
      </form>
    </div>
  )
}
