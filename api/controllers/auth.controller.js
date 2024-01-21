import { UserModel } from "../models/index.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/index.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  
  try {
    const {username, email, password} = req.body
  
    const hashedPassword = await bcryptjs.hash(password, 10)
  
    const newUser = new UserModel({username, email, password: hashedPassword})

    await newUser.save()
  
    res.status(201).json({success: true, message: 'User successfully created'})
    
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const validUser = await UserModel.findOne({email})
    if(!validUser) return next(errorHandler(404, 'User not found!'))

    const validPassword = await bcryptjs.compare(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'))

    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    // const expiryTime = new Date(Date.now() + (24 * 60 * 60 * 1000))

    const {password: pass, ...rest} = validUser._doc
    res
      .cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json({success: true, user: rest})

  } catch (error) {
    next(error)
  }
}