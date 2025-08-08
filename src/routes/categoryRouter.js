const {Router} = require("express");
const { Category } = require("../db");
const { StatusCodes } = require("http-status-codes");
const { validateCategoryScheam, checkCategoryExist } = require("../middlewares/category");
const router = Router();

router.post("/category", validateCategoryScheam, checkCategoryExist, async (req, res, next) => {
    const {name} = req.body;

    try {
        const finalCategory = new Category({
            name,
        })
        const response = await finalCategory.save();

        res.status(StatusCodes.CREATED).json({
            msg: "Category created"
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router;