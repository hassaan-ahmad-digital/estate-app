import React from 'react'
import { userSelector } from '../store/user'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


export const PrivateRoute = () => {
  const currentUser = useSelector(userSelector)
  return currentUser ? <Outlet/> : <Navigate to={'/sign-in'}/>
}