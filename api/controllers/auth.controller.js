import { UserModel } from "../models/index.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/index.js"

export const signup = async (req, res, next) => {
  
  try {
    const {username, email, password} = req.body
  
    const hashedPassword = await bcryptjs.hash(password, 10)
  
    const newUser = new UserModel({username, email, password: hashedPassword})

    await newUser.save()
  
    res.status(201).json({status: 'success', newUser})
    
  } catch (error) {
    next(error)
  }
}