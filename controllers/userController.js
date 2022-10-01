import mongoose from 'mongoose';
import { user } from '../Models/userModel.js';
import { generateToken } from '../utility/utility.js';

// to creat a user
export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    // const something = email
    try {
        const reg = user.create({ username, email, password, role });
        // console.log(reg)
        // await reg.save();
        return res.json({ reg })

    } catch (error) {
        console.error(error.message);
        return res.json({ err: 'an error ocurred', msg: error.message });
    }
}; //remember to test if the avove is working.;

//get all users
export const getAllUser = async (req, res) => {
    try {
        const reg = await user.find();
        if (reg) {
            res.send(reg);
        } else {
            res.send('no User found');
        }
    } catch (error) {
        console.error(error.message);
    } // remember to test if the above code works.
};

//get a single user by ID
export const getUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                message: 'User not found'
            });
        } const id = req.params.id;
        const reg = await user.findById(id);
        if (reg) {
            res.send(reg);
        }
    } catch (error) {
        console.error(error.message);
    } //remember to check if the above is working.;
};

//update a user profile
export const UpdateUserProfile = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                message: "User not found"
            });
        } const id = req.params.id;
        const reg = await user.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (reg) {
            res.json({
                message: "Profile updated successfully!",
                data: reg
            });
        }
    } catch (error) {
        console.error(error.message);
    } //remember to check if the above code is working
};

// to delete a user profile.
export const deleteUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                message: "User not found"
            });
        }
        const id = req.params.id;
        const reg = await user.findByIdAndDelete(id);
        if (reg) {
            res.json({
                message: "User deleted successfully"
            });
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const signUp = async (req, res) => {
    const { username, password, email, role } = req.body;

    const userExists = await user.findOne({ email });
    if (userExists) {
        throw new Error("User already exists")
    }

    const newUser = await user.create({
        username,
        email,
        password,
        role
    });
    if (newUser) {
        res.status(200).json({
            _id: newUser._id,
            name: newUser.username,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id)
        })
    }
}




export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const User = await user.login(email, password);
      // console.log(user)
      const token = await generateToken(user._id)
      if (!user) {
        throw new Error("Incorrect email or password")
      }


      if (User) {
        res.json({
          _id: user._id,
        name:   user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Incorrect Password or Email');
    }

  }