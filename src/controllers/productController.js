let products = [
  {
    id: 1,
    name: 'Nasi Goreng',
    price: 15000,
    stock: 100,
    category: 'Makanan',
    description: 'Nasi goreng spesial dengan telur'
  },
  {
    id: 2,
    name: 'Es Teh',
    price: 5000,
    stock: 200,
    category: 'Minuman',
    description: 'Es teh manis segar'
  },
  {
    id: 3,
    name: 'Ayam Goreng',
    price: 20000,
    stock: 50,
    category: 'Makanan',
    description: 'Ayam goreng crispy'
  }
];

let nextId = 4;

const getAllProducts = (req, res) => {
  res.json({
    success: true,
    message: 'Products retrieved successfully',
    data: products
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    message: 'Product retrieved successfully',
    data: product
  });
};

const createProduct = (req, res) => {
  const { name, price, stock, category, description } = req.body;

  if (!name || !price || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Name, price, and stock are required'
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    stock: parseInt(stock),
    category: category || 'Uncategorized',
    description: description || ''
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const { name, price, stock, category, description } = req.body;
  
  products[index] = {
    ...products[index],
    name: name || products[index].name,
    price: price !== undefined ? parseFloat(price) : products[index].price,
    stock: stock !== undefined ? parseInt(stock) : products[index].stock,
    category: category || products[index].category,
    description: description !== undefined ? description : products[index].description
  };

  res.json({
    success: true,
    message: 'Product updated successfully',
    data: products[index]
  });
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
