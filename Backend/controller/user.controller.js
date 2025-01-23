const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const { createUser } = require('../services/user.service');
const { bcryptPassword } = require('../utils/bcryptPassword');
const { generateToken } = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const donationModel = require('../models/donation.model')

module.exports.registerUser = async (req , res , next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const {fullname , email , password} = req.body;

   try{

        if(!fullname || !email || !password){
            throw new Error('Please fill all the fields');
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).json({error: "Email already exists"})
        }
        const hashedPassword = await bcryptPassword(password);
        const user = await createUser({
            fullname ,
            email ,
            password : hashedPassword
        });

        const token = generateToken(user);
        res.cookie('token' , token)
        res.status(200).json({message: "User created successfully" , user , token})
    }
    catch(err){
        res.status(500).send(err.message)
    }

}

module.exports.loginUser = async (req , res , next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const {email , password} = req.body;

    if(!email){
        return res.status(400).json({error: "Email is required"})
    }

    if(!password){
        return res.status(400).json({error: "Password is required"})
    }

    try{

        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(400).json({error: "Invalid email or password"})
        }

        bcrypt.compare(password , user.password , function(err , result){
            if(result){
                const token = generateToken(user);
                res.cookie('token' , token)
                delete user._doc.password
                res.status(200).json({message: "User logged in successfully" , user , token})
            }
            else{
                return res.status(400).json({error: "invalid email or password"})
            }
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }    
}

module.exports.logoutUser = async (req , res , next) => {
    res.cookie('token' , "");
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}

module.exports.getProfile = async (req , res , next) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({error: "Unauthorized"})
    }
    const userId = user._id;
    if(!userId){
        return res.status(401).json({error: "Unauthorized"})
    }
    try{

        res.status(200).json({
            message: "user Found",
            userDetails: user
        });
    }catch(err){
        res.status(500).json({error: err.message})
    }

}

module.exports.donationSubmited = async (req, res , next) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({error: "Unauthorized"})
    }
    const userId = user._id;
    try {
        const { organizationName, amount , email } = req.body;
      // Validation
      if(!userId){
        return res.status(401).json({error: "Unauthorized"})
      }
      if ( !organizationName) {
        return res.status(400).json({ message: 'oranizationName are required.' });
      }
      if ( !amount) {
        return res.status(400).json({ message: 'amount are required.' });
        }
        if ( !email) {
            return res.status(400).json({ message: 'email are required.' });
            }
  
      // Create a new donation
      const newDonation = new donationModel({
        userId,
        organizationName,
        amount,
        email
      });
  
      const savedDonation = await newDonation.save();
      res.status(200).json({ message: 'Donation created successfully.', data: savedDonation });
    } catch (error) {
      res.status(500).json({ message: 'Error creating donation.', error: error.message });
    }
}

exports.getDonationsByUserId = async (req, res) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({error: "Unauthorized"})
    }
    const userId = user._id;
    try {
      
      const donations = await donationModel.find({ userId });
  
      if (!donations.length) {
        return res.status(404).json({ message: 'No donations found for this user.' });
      }
  
      res.status(200).json({ message: 'Donations retrieved successfully.', data: donations });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving donations.', error: error.message });
    }
  };