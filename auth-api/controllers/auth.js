const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.userSignup = async (req,res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password,12);
    if(!passwordHash){
      throw new Error('hash gone wrong!');
    }

    const user = new User({
      email: req.body.email,
      password: passwordHash
    });

    await user.save();
    
    res.status(201).json({
      message: 'User Created Successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Invalid user credentials'
    })
  }
}

exports.userLogin = async (req,res) => {
  try {
    const user = await User.findOne({email:req.body.email});
    const isAuth = await bcrypt.compare(req.body.password,user.password);

    if(!isAuth){
      throw new Error('Authentication failed,Check your credentials');
    }

    const token = jwt.sign(
      {email: user.email, userId: user._id},
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token:token,
      userId:user._id,
      expiresIn: 3600
    });

  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed,Check your credentials'
    });
  }
}