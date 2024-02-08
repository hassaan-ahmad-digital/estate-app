import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../store/user'
import { Navigate, Outlet } from 'react-router-dom'


export const PublicRoute = () => {
  const currentUser = useSelector(userSelector)
  return currentUser ? <Navigate to="/profile"/> : <Outlet/>
}