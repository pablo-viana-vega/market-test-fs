import React, { useState, useEffect } from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    fetchPurchases();
    fetchProducts();
  }, []);

  const fetchPurchases = async () => {
    const response = await axios.post("/api/get/purchases");
    console.log(response);
    if (response.data.status === 1) {
      setPurchases(response.data.purchases);
      setStatus(1);
    } else {
      setStatus(0);
    }
  };

  const fetchProducts = async () => {
    const response = await axios.post("/api/get/products");
    console.log(response);
    setProducts(response.data.products);
  };

  const getProductNameById = (productId) => {
    const product = products.find((product) => product.id === +productId);
    return product ? product.name : "";
  };

  return (
    <div className="mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Vendas</h2>
      {status === 0 ? (
        <p className="text-red-500">Nenhuma venda encontrada.</p>
      ) : (
        <table className="border rounded bg-gray-100 w-full text-black">
          <thead>
            <tr>
              <th className="bg-gray-200 p-2">Product</th>
              <th className="bg-gray-200 p-2">Name</th>
              <th className="bg-gray-200 p-2">Email</th>
              <th className="bg-gray-200 p-2">Phone</th>
              <th className="bg-gray-200 p-2">Quantity</th>
              <th className="bg-gray-200 p-2">Total Price</th>
              <th className="bg-gray-200 p-2">Total Tax Price</th>
              <th className="bg-gray-200 p-2">Item Price</th>
              <th className="bg-gray-200 p-2">Item Tax Percentage</th>
              <th className="bg-gray-200 p-2">Item Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-200">
                <td className="p-2">
                  {getProductNameById(purchase.product_id)}
                </td>
                <td className="p-2">{sanitizeHtml(purchase.name)}</td>
                <td className="p-2">{sanitizeHtml(purchase.email)}</td>
                <td className="p-2">{sanitizeHtml(purchase.phone)}</td>
                <td className="p-2">{purchase.quantity}</td>
                <td className="p-2">{purchase.total_price}</td>
                <td className="p-2">{purchase.total_tax_price}</td>
                <td className="p-2">{purchase.item_price}</td>
                <td className="p-2">{purchase.item_tax_percentage}</td>
                <td className="p-2">{purchase.item_total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


export default Purchases;
