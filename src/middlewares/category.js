const { StatusCodes } = require("http-status-codes");
const { categorySchema } = require("../utils/zod");
const { Category } = require("../db");

function validateCategoryScheam(req, res, next) {
    const {name} = req.body;

    const result = categorySchema.safeParse({
        name,
    })

    if(!result.success) {
        res.status(StatusCodes.LENGTH_REQUIRED).json({
            msg: "Invalid category",
            issues: result.error.issues
        })
        return
    }

    next();
}

async function checkCategoryExist(req, res, next) {
    const {name} = req.body;

    try {
        const response = await Category.findOne({
            name
        })

        if(response) {
            res.status(StatusCodes.CONFLICT).json({
                msg: "Category with this name already exist"
            })
            return;
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkCategoryExist, validateCategoryScheam
}