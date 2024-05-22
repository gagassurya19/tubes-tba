"use client"
import axios from "axios"
import { useState } from "react"

export default function Home() {
  
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api")
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useState(() => {
    fetch()
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>

    </div>
  )
}
