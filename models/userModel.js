import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['regular', 'professional'],
            default: false
        },
        isAdmin:{
            type:Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }

)

// userSchema.methods.toJSON = function() {
//     const user = this
//     const userObject = user.toObject();
//     delete userObject.password
// }

// hash password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }
    next()
})




userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect Password');
        // return 'Incorrect Password'
    } else {
        throw Error('Incorrect Email')
        // return 'Incorrect Email'
    }
}

export const user = mongoose.model('user', userSchema)