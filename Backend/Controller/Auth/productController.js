const Product = require('../../models/productSchema');

// Create Product
const createProduct = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('User ID:', req.userId);
  
    try {
      const newProduct = new Product({ ...req.body, createdBy: req.userId });
      await newProduct.save();
      console.log('Product Created:', newProduct);
  
      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      console.error('Error in createProduct:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Get All Products
const getAllProduct = async (req, res) => {
    try {   
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error in fetching all products', error: error.message });
    }
};

// Get Single Product
const singleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error in fetching single product', error: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error in deleting product', error: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Error in updating product', error: error.message });
    }
};

module.exports = { createProduct, getAllProduct, singleProduct, updateProduct, deleteProduct };
