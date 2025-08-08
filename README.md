Simple Products & Categories API

This is a basic server app that lets you:

Create a category

Create a product under a category

Get products (all, by category name, or by category id)

No website UI is included. You interact with it using simple HTTP requests (can be done via Postman, curl, or a browser for GET requests).

What you need

Node.js installed (v16+ recommended)

Install dependencies:

Run: npm install

Start the server:

Run: node index.js

You should see: "connection with database is successfull" and "server started"

How the data works

Category: just a name (must be unique)

Example: "Electronics", "Grocery"

Product: has name, price, quantity, and category (category must already exist)

Example: name="iPhone 15", price=799, quantity=10, category="Electronics"

Endpoints you can use
Base URL: http://localhost:PORT/api/v1
Replace PORT with the number in your .env (default example: 3000)

A) Create a category

Method: POST

URL: /api/v1/category

Body (JSON):
{
"name": "Electronics"
}

Success response: 201 Created
{
"msg": "Category created"
}

Common errors:

409 Conflict if category already exists

411 Length Required if the name is missing or invalid

B) Create a product

You must have created the product’s category first.

Method: POST

URL: /api/v1/products

Body (JSON):
{
"name": "iPhone 15",
"price": 799,
"quantity": 10,
"category": "Electronics"
}

Notes:

price and quantity must be numbers (strings like "10" are accepted and converted)

category must be the category’s name (not the id)

Success response: 201 Created
{
"msg": "Product Added",
"id": "<new product id>"
}

Common errors:

409 Conflict if the category does not exist

411 Length Required if fields are missing/invalid

C) Get products (all)

Method: GET

URL: /api/v1/products

Response: 200 OK
{
"products": [ ...list of products... ]
}

D) Get products by category name

Method: GET

URL: /api/v1/products?category=Electronics

If the category exists:
{
"products": [ ...products in Electronics... ]
}

If the category name does not exist:
{
"products": null,
"msg": "No category is present with name Electronics"
}

E) Get products by category id

Method: GET

URL: /api/v1/products/<categoryId>
Example: /api/v1/products/66b4c1f2e3a1c2d4e5f67890

Response:

If there are products for that category id:
{
"products": [ ... ]
}

If none found:
{
"product": null
}

Example requests (with curl)

Create category:
curl -X POST http://localhost:3000/api/v1/category
-H "Content-Type: application/json"
-d '{"name":"Electronics"}'

Create product:
curl -X POST http://localhost:3000/api/v1/products
-H "Content-Type: application/json"
-d '{"name":"iPhone 15","price":799,"quantity":10,"category":"Electronics"}'

Get all products:
curl http://localhost:3000/api/v1/products

Get products by category name:
curl "http://localhost:3000/api/v1/products?category=Electronics"

Tips and notes

Always create the category first, then the product.

Category names are case-sensitive in the current setup.

If the server crashes on start, double-check:

DBURL is correct and accessible

PORT is a free port

You ran npm install

To stop the server: press Ctrl + C in the terminal window running it.

Troubleshooting common messages

"Trying to add product whose category does exist"

Means the category you provided in the product body wasn’t found. Create it first or check spelling.

"Invalid product" or "Invalid category"

The request body is missing required fields or in the wrong format.

"Route does not exist"

You used the wrong URL. Check the paths above carefully.

That’s it. With this, you can create categories and add products to them, then list products by all, by category name, or by category id.