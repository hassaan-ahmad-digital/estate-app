import { UserModel } from "../models/index.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  
  try {
    const {username, email, password} = req.body
  
    const hashedPassword = await bcryptjs.hash(password, 10)
  
    const newUser = new UserModel({username, email, password: hashedPassword})

    await newUser.save()
  
    res.status(201).json({status: 'success', newUser})
    
  } catch (error) {
    res.status(409).json({status: 'error', error: error.message})
  }
}