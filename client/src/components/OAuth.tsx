import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import React from "react"
import { app } from "../firebase"
import { BASE_SERVER_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { userActions } from "../store/user"
import { useNavigate } from "react-router-dom"

export function OAuth() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {signInSuccess} = userActions

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: "select_account" })
      
      const auth = getAuth(app)

      const {user} = await signInWithPopup(auth, provider)
      
      const res = await fetch(`${BASE_SERVER_URL}/v1/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: user.displayName, email: user.email, photo: user.photoURL }),
      })

      const data = await res.json()
      
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) {
      console.log('could not sign in with google', error)
    }
  }

  return (
    <button
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      type="button"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  )
}
