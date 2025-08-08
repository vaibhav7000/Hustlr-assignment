const { StatusCodes } = require("http-status-codes")

const { Router } = require("express");
const router = Router();
const { Product, Category } = require("../db/index");
const {validateProductScheam, checkCategoryExist} = require("../middlewares/product");


router.get("/products/:id?", async (req, res, next) => {
    const category = req.query.category;

    if (!category) {
        const id = req.params.id;
        const payload = {}

        if (id) {
            payload.category = id
        }

        try {
            const response = await Product.find({
                ...payload
            });

            if (id) {
                if (response[0]) {
                    res.status(StatusCodes.OK).json({
                        products: response,
                    })
                    return;
                }

                res.status(StatusCodes.OK).json({
                    product: null,
                })

                return;
            }

            res.status(StatusCodes.OK).json({
                products: response,
            })

        } catch (error) {
            next(error);
        }

    } else {

        try {
            const categoryDb = await Category.findOne({
                name: category
            });

            if(!categoryDb) {
                res.status(StatusCodes.OK).json({
                    products: null,
                    msg: `No category is present with name ${category}`,
                })
                return
            }

            const response = await Product.find({
                category: categoryDb.id
            });

            if(response &&  !response.length) {
                res.status(StatusCodes.OK).json({
                    products: null
                })

                return
            }

            res.status(StatusCodes.OK).json({
                products: response
            })
        } catch (error) {
            next(error);
        }
    }

})


router.post("/products", validateProductScheam, checkCategoryExist, async (req, res, next) => {
    const product = req.body;
    const id = req.categoryId;

    try {
        const finalProduct = new Product({
            name: product.name,
            quantity: product.quantity,
            category: id,
            price: product.price
        })

        const response = await finalProduct.save();

        res.status(StatusCodes.CREATED).json({
            msg: "Product Added",
            id: response.id
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router;