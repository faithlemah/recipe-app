import mongoose from 'mongoose';

const recipesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        ingredents: [
            {
                type: String,
                required: true,
            },
        ],
        duration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        photo: String,
        comments: [
            {
                type: String
            }
        ],
        rating: {
            type: Number,
            default: 0,
        },
        similarRecipe: [{
            type: String,
        }],
        tag: {
            type: String,
            required: true,
        },
        likes: [{
            type: String,
        }],
        likeCount: {
            type: Number,
            default: 0,
        },


    },
    {
        timestamps: true,
    }
)


export const recipe = mongoose.model('recipe', recipesSchema)