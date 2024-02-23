import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { userSelector } from "../store/user"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"

// type Props = {}
type ProfileData = {
  username: string
  email: string
  password: string
  avatar: string
}

export const Profile = () => {
  const currentUser = useSelector(userSelector)
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [filePerc, setFilePerc] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)
  const [formData, setFormData] = useState<ProfileData>({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.photo || "",
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] // Use optional chaining to safely access files
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleChange = (name: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [name]: e.target.value }))
  }

  function handleFileUpload(file: File) {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
        console.log("upload is " + progress + "% done.")
      },
      () => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setFormData(prev => ({ ...prev, avatar: downloadURL }))
        })
      },
    )
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" onChange={handleFileChange} ref={fileRef} hidden accept="image/*" />
        <img
          src={formData.avatar}
          alt="user profile photo"
          onClick={() => fileRef?.current?.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          onChange={handleChange("username")}
          value={formData.username}
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          onChange={handleChange("email")}
          value={formData.email}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange("password")}
          value={formData.password}
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
