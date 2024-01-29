import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_SERVER_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { userActions } from "../store/slices"

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormInitialState: SignInFormData = {
  email: '',
  password: ''
}

export const SignIn = () => {
  const [formData, setFormData] = useState<SignInFormData>(signInFormInitialState)
  const [error, setError] = useState<string | boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {signInFailure, signInStart, signInSuccess} = userActions

  const handleChange = (key: keyof SignInFormData, value: string):void => {
    setFormData(prev => {
      return {
        ...prev,
        [key]: value
      }
    })
  }


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signInStart())
    const res = await fetch(`${BASE_SERVER_URL}/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    if(!data.success) {
      const error = new Error(data.message as string)
      dispatch(signInFailure(error))
      return;
    }
    // setLoading(false)
    // setError(false)
    // setFormData(signInFormInitialState)
    dispatch(signInSuccess())
    navigate('/')
    console.log({data})
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
