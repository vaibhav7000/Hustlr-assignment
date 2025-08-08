const { StatusCodes } = require("http-status-codes");
const { productSchema } = require("../utils/zod");
const { Category } = require("../db");

function validateProductScheam(req, res, next) {
    const product = req.body;

    const result = productSchema.safeParse({
        ...product
    })

    if(!result.success) {
        res.status(StatusCodes.LENGTH_REQUIRED).json({
            msg: "Invalid product",
            issues: result.error.issues
        })

        return
    }

    next();
}

async function checkCategoryExist(req, res, next) {
    const {category} = req.body;

    try {
        const response = await Category.find({
            name: category
        })

        if(response && !response.length) {
            res.status(StatusCodes.CONFLICT).json({
                msg: "Trying to add product whose category does exist"
            })
            return;
        }

        req["categoryId"] = response[0].id

        next();
    } catch (error) {
        next(error);
    }
}


module.exports = {
    validateProductScheam, checkCategoryExist
}