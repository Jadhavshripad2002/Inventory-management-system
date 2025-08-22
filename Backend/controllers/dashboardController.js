
const db = require("../config/db");

exports.getSummary = (req, res) => {
  let summary = {};

  db.query("SELECT COUNT(*) AS totalCustomers FROM customer", (err, customerResult) => {
    if (err) return res.status(500).json({ error: "Error fetching customers" });
    summary.customers = customerResult[0].totalCustomers;

    db.query("SELECT COUNT(*) AS totalSuppliers FROM supplier", (err, supplierResult) => {
      if (err) return res.status(500).json({ error: "Error fetching suppliers" });
      summary.suppliers = supplierResult[0].totalSuppliers;

      db.query("SELECT COUNT(*) AS totalProducts FROM product", (err, productResult) => {
        if (err) return res.status(500).json({ error: "Error fetching products" });
        summary.products = productResult[0].totalProducts;

        db.query("SELECT COUNT(*) AS totalCategories FROM product_category", (err, categoryResult) => {
          if (err) return res.status(500).json({ error: "Error fetching categories" });
          summary.categories = categoryResult[0].totalCategories;

          db.query("SELECT COUNT(*) AS totalStockItems FROM product_stock", (err, stockResult) => {
            if (err) return res.status(500).json({ error: "Error fetching stock" });
            summary.stock = stockResult[0].totalStockItems;

            db.query("SELECT COUNT(*) AS totalPurchases FROM purchase", (err, purchaseResult) => {
              if (err) return res.status(500).json({ error: "Error fetching purchases" });
              summary.purchases = purchaseResult[0].totalPurchases;

              db.query("SELECT COUNT(*) AS totalSales FROM sales", (err, salesResult) => {
                if (err) return res.status(500).json({ error: "Error fetching sales" });
                summary.sales = salesResult[0].totalSales;
                res.json(summary);
              });
            });
          });
        });
      });
    });
  });
};
