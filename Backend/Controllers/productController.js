const Product = require("../Modals/productSchema");

const ERRORS = {
  INTERNAL_ERROR : "Internal Server Error",
  PRODUCT_NOT_FOUND: "Product Not found",
  BAD_REQUEST: "Bad Request Invalid data received"
}

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;

    const skipCount = (page - 1) * limit;

    const products = await Product.find().skip(skipCount).limit(limit);

    return res.status(200).json({ products: products });
  } catch (e) {
    return res.status(500).json({message:INTERNAL_ERROR ,error: e.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const _id = req.params.id;

    const product = await Product.findById(_id);

    if(!product){
      return res.status(400).json({message:ERRORS.PRODUCT_NOT_FOUND , error:ERRORS.BAD_REQUEST})
    }

    return res.status(200).json({
      message: "Success",
      product: product,
    });
  } catch (e) {
    return res.status(500).json({ message: ERRORS.INTERNAL_ERROR , error:e.message });
  }
};

const getProductsByIds = async (req, res) => {
  const ids = req.params.ids.split(",");
  try {
    const products = await Product.find({ _id: { $in: ids } });
    res.status(200).json(products);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message:ERRORS.INTERNAL_ERROR , error:err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = 8;

    const skipCount = (page - 1) * limit;

    const products = await Product.find({ category })
      .skip(skipCount)
      .limit(limit);

    return res.status(200).json({
      message: "Success",
      products: products,
    });
  } catch (e) {
    return res.status(500).json({ message: ERRORS.INTERNAL_ERROR });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: ERRORS.PRODUCT_NOT_FOUND });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: product,
    });
  } catch (e) {
    return res.status(500).json({ message: ERRORS.INTERNAL_ERROR });
  }
};

const getProductBySearch = async(req, res)=>{
  try{
    const  searchQuery  = req.query.searchQuery;
    // console.log(searchQuery)

    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is missing." });
    }

    const query = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } }, 
        { brand: { $regex: searchQuery, $options: "i" } }, 
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(404).json({ message: ERRORS.PRODUCT_NOT_FOUND });
    }

    return res.status(200).json({products});

  }catch(e){
    return res.status(500).json({message:ERRORS.INTERNAL_ERROR ,error:e.message})
  }
}

const addProduct = async (req, res) => {
  try {
    const updateData = req.body.formData;

    // Update the product fields based on the updateData object
    const product = new Product({
      title: updateData.title,
      brand: updateData.brand,
      images: updateData.images.split(","),
      InStock: updateData.InStock,
      category: updateData.category,
      price: updateData.price,
      description: updateData.description,
    });

    await product.save();

    return res
      .status(201)
      .json({ message: "Product updated successfully", product: product });
  } catch (e) {
    return res.status(400).json({ message: ERRORS.BAD_REQUEST , error:e.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByIds,
  getProductsByCategory,
  updateProductById,
  getProductBySearch,
  addProduct
};
