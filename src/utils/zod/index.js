const z = require("zod");

const productSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    quantity: z.coerce.number(),
    category: z.string(),
})

const categorySchema = z.object({
    name: z.string(),
})


module.exports = {
    productSchema, categorySchema
}