const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category')

const addCategory = async (req, res) => {
    try {
            const newCategory = new Category(req.body);
             await newCategory.save()
            res.status(200).send({
                message: "Category added"
            });


    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getAllCategories = async (req, res) => {
    try {
        const Categories = await Category.find({}).sort({ _id: -1 });
        res.send(Categories);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const Category = await Category.findById(req.params.id);
        res.send(Category);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const updateCategory = async (req, res) => {
 
    try {
    
        const CategoryEdited = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              name:req.body.name
             
            },
          }
        );
        res.status(200).json({
          message: "Category edited",
          data : CategoryEdited
        })
    
      } catch(err) {
        res.status(500);
      }
};


const deleteCategory = (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send({
                message: err.message,
            });
        } else {
            res.status(200).send({
                message: 'Category Deleted Successfully!',
            });
        }
    });
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};


