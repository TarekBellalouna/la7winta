const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Brand = require('../models/Brand')






const getAllBrands = async (req, res) => {
    try {
        const Brands = await Brand.find({}).sort({ _id: -1 });
        res.send(Brands);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};



const getBrandById = async (req, res) => {
    try {
        const Brand = await Brand.findById(req.params.id);
        res.send(Brand);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

const updateBrand = async (req, res) => {
    try {
        const Brand = await Brand.findById(req.params.id);
        if (Brand) {
            Brand.name = req.body.name;
            Brand.image = req.body.image;
            await Brand.save();
            res.send({ data: Brand, message: 'Brand updated successfully!' });
        }
        // handleBrandStock(Brand);
    } catch (err) {
        res.status(404).send(err.message);
    }
};


const deleteBrand = (req, res) => {
    Brand.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send({
                message: err.message,
            });
        } else {
            res.status(200).send({
                message: 'Brand Deleted Successfully!',
            });
        }
    });
};

module.exports = {
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
};


