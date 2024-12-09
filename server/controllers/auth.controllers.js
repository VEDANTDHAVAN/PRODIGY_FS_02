const User = require('../models/user');
const {comparePassword, hashPassword} = require('../helpers/auth');
const test = (req, res) => {
    res.json('test is working')
};
const jwt = require('jsonwebtoken');

const registerUser = async (req, res)=> {
    try {
        const {firstname, lastname, email, password, confpassword} = req.body;
        //check if firstname and lastname are entered
        if(!firstname||!lastname){
            return res.json({
                error: 'First name and Last name is Required'
            })
        }
        //check if password is Strong
        if(!password || password.length < 5){
            return res.json({
                error: "Password is required and should be atleast 5 characters"
            })
        }

        //check email
        const exist= await User.findOne({email});
        if(exist){
            return res.json({
                error: "Email is Already Taken!! Try Another Email."
            })
        }
        //encrypt the password
        const hashedPassword = await hashPassword(password)
        //create user in database
        const user = await User.create({
            firstname, lastname, email, 
            password:hashedPassword, 
            confpassword:hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        //check if user already exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found!!'
            })
        }
        //check if password matches
        const match = await comparePassword(password, user.password)
        if(match){
            //assign a JasonWebToken
            res.json('passwords matched')
        }
        if(!match){
            //json response
            res.json({
                error: 'passwords do not match!'
            })
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const {password: hashedPassword, ...rest} = user._doc;
        const expiryDate= new Date(Date.now() + 3600000);
        res.cookie('token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
    } catch (error) {
        
    }
}

//read user data
//http://localhost:8000/
const readUser = async (req, res) => {
    const data = await User.find({})
    res.json({success: true, data: data})
}
//update user data
//http://localhost:8000/api/update
const updateUser = async (req, res) => {
    console.log("Request Body: ",req.body);
    console.log("Request Params:", req.params);
    const {id} = req.params;
    const {firstname, lastname, email} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate( id, {firstname, lastname, email},
          {new: true, runValidators: true}
        );
        if(!updatedUser) {
            console.log("User not found or not Updated.");
            return res.status(404).json({error: "User not Updated!"})
        }
        res.status(200).send({message: "User Updated Successfully!!", user: updatedUser});
    } catch (error) {
        console.error("Error Updating User:",error);
        res.status(500).json({error: "Internal Server Error."});
    }
    /*const data = await User.updateOne({_id: _id},rest)
    res.send({success: true, message: 'Data Updated Successfully!!', data: data})*/
};

//delete user
//http://localhost:8000/api/delete
const deleteUser = async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await User.deleteOne({_id: id})
    res.send({success: true, message: "Data Deleted Successfully!!", data: data})
}
module.exports = {
    test,
    registerUser,
    loginUser,
    readUser, 
    updateUser,
    deleteUser
}