let transactions = [];
let nextTransactionId = 1;

const getAllTransactions = (req, res) => {
  res.json({
    success: true,
    message: 'Transactions retrieved successfully',
    data: transactions
  });
};

const getTransactionById = (req, res) => {
  const id = parseInt(req.params.id);
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }

  res.json({
    success: true,
    message: 'Transaction retrieved successfully',
    data: transaction
  });
};

const createTransaction = (req, res) => {
  const { items, customerName, paymentMethod } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Items are required and must be a non-empty array'
    });
  }

  // Validate each item in the transaction
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    if (!item.productId || !item.productName || item.quantity === undefined || item.price === undefined) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} is missing required fields (productId, productName, quantity, price)`
      });
    }

    const quantity = parseInt(item.quantity);
    const price = parseFloat(item.price);

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} has invalid quantity`
      });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} has invalid price`
      });
    }
  }

  // Calculate total
  let totalAmount = 0;
  const transactionItems = items.map(item => {
    const quantity = parseInt(item.quantity);
    const price = parseFloat(item.price);
    const subtotal = quantity * price;
    totalAmount += subtotal;
    return {
      productId: item.productId,
      productName: item.productName,
      quantity,
      price,
      subtotal
    };
  });

  const newTransaction = {
    id: nextTransactionId++,
    customerName: customerName || 'Guest',
    items: transactionItems,
    totalAmount,
    paymentMethod: paymentMethod || 'Cash',
    status: 'Completed',
    transactionDate: new Date().toISOString()
  };

  transactions.push(newTransaction);

  res.status(201).json({
    success: true,
    message: 'Transaction created successfully',
    data: newTransaction
  });
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction
};
