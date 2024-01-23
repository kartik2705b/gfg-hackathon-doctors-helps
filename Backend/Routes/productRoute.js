const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

router.get("/products", productController.getProducts);
router.get("/products/QuerySearch" , productController.getProductBySearch)
router.get("/products/:id", productController.getProductById);
router.get("/products/multi/:ids", productController.getProductsByIds);
router.get("/products/category/:category", productController.getProductsByCategory);
router.put("/products/:id", productController.updateProductById);

module.exports = router;
