import express from 'express';
import mongoose from 'mongoose';
import { recipe } from '../Models/recipeModels.js';



export const createRecipe = async (req, res) => {
    try {
        const rec = new recipe(req.body);
        console.log(rec)

        await rec.save();
        res.send(rec)
    } catch (error) {
        console.error(error.message);
    }
}

//get all recipe
export const getAllRecipe = async (req, res) => {
    try {
        const rec = await recipe.find();
        if (rec) {
            res.send(rec);
        } else {
            res.send("No Recipe found");
        }
    } catch (error) {
        console.error(error.message);
    }
}

//get a single recipe by iD
export const getRecipe = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                message: "Recipe not found"
            })
        }
        const id = req.params.id;
        const rec = await recipe.findById(id);
        if (rec) {
            res.send(rec);
        }
    } catch (error) {
        console.error(error.message);
    }
}

//update a recipe
export const updateRecipe = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                message: "Recipe not found"
            });
        } const id = req.params.id;
        const rec = await recipe.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        if (rec) {
            res.json({
                message: "Recipe updated successfully",
                data: rec
            });
        }

    } catch (error) {
        console.erroe(error.message);
    }
}

// logic to delete a Recipe
export const deleteRecipe = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({
                message: "Recipe not found"
            });
        }
        const id = req.params.id;
        const rec = await recipe.findByIdAndDelete(id);
        if (rec) {
            res.json({
                message: "Recipe deleted successfully"
            })
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const LikeRecipe = async(req,res) => {
    const allRecipe = await recipe.find({})

    const newArr = allRecipe.filter(recipe => recipe.tag === "local")
    res.json(newArr)
}