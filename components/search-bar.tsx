"use client"

import { FormEvent, useState } from "react"

const isValidURL = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname
    if (hostname.includes("amazon") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")) {
      return true
    }
  } catch (e) {
    return false
  }
}

const Searchbar = () => {
  const [searchPrompt, setsearchPrompt] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidURL(searchPrompt)

    if (!isValidLink) {
      alert("Please Enter a Valid Amazon Link")
      return
    }

    try {
      setisLoading(true)
      //scrape product page
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }

  }
  return (
    <form className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setsearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === "" || isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>

    </form>
  )
}

export default Searchbar