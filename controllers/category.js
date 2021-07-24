const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

class Categorydetails {
    static async categoryById(req, res, next, id) {
        await Category.findById(id).exec((err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: "Category does not exist"
                });
            }
            req.category = category;
            next();
        });
    };
    static async create(req, res) {
        const category = new Category(req.body);
        try {
            await category.save((err, data) => {
                if (err) {
                    return res.status(400).json({ error: errorHandler(err) });
                }
                res.json({ data });
            });
        } catch (error) {
            res.status(400).json({ error: error.messgae })
        }
    }
    static read = (re, res) => {
        return res.json(req.category);
    };
    static async update(req, res) {
        const category = req.category;
        category.name = req.body.name;
        try {
            await category.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(data);
            });
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    static remove = (req, res) => {
        const category = req.category;
        category.remove((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json({
                message: "Category deleted"
            });
        });
    };

    static async list(req, res) {
        try {
            Category.find().exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(data);
            });
        } catch (error) {
            res.status(400).json({ error: errro.message })
        }
    };
}

module.exports = Categorydetails;