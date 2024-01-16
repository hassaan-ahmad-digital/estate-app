import React, { useState } from "react"
import { Link } from "react-router-dom"

// type Props = {}

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const signUpFormInitialState: SignUpFormData = {
  username: "",
  email: '',
  password: ''
}

export const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>(signUpFormInitialState)


  function handleChange(key: keyof SignUpFormData, value: string) {
    setFormData(prev => {
      return {
        ...prev,
        [key]: value
      }
    })
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={formData.username}
          onChange={e => handleChange("username", e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={formData.email}
          onChange={e => handleChange("email", e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={e => handleChange("password", e.target.value)}
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  )
}
