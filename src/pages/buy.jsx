import React, { useState, useEffect } from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

function Buy() {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.post("/api/get/products");
      if (res.data.status === 1) {
        console.log(res);
        setProducts(res.data.products);
        setQuantities(
          res.data.products.reduce((obj, product) => {
            obj[product.id] = 1;
            return obj;
          }, {})
        );
      } else {
        console.log("Não há produtos cadastrados.");
      }
    };

    const fetchTypes = async () => {
      const res = await axios.post("/api/get/types");
      if (res.data.status === 1) {
        console.log(res);
        setTypes(res.data.types);
      } else {
        console.log("error");
      }
    };

    fetchProducts();
    fetchTypes();
  }, []);

  const getTaxPercentage = (productType) => {
    const type = types.find((type) => type.name === productType);
    if (type) {
      return type.percent_taxes;
    }
    return 0;
  };

  const calculateTotalPrice = (productPrice, taxPercentage, quantity) => {
    const price = parseFloat(productPrice.replace(",", "."));
    const totalTax = price * (taxPercentage / 100);
    const totalPrice = price * quantity + totalTax;
    return totalPrice.toFixed(2);
  };

  const taxPrice = (productPrice, taxPercentage, quantity) => {
    const price = parseFloat(productPrice.replace(",", "."));
    const totalTax = price * (taxPercentage / 100);
    return (totalTax * quantity).toFixed(2);
  };

 const handleBuy = async (product, quantity) => {
   const name = prompt("Seu Nome:");
   if (name === null) {
     return;
   }
   const email = prompt("Seu Email:");
   if (email === null) {
     return;
   }
   const phone = prompt("Seu Telefone:");
   if (phone === null) {
     return;
   }

   const taxPercentage = getTaxPercentage(product.type);
   const price = product.price;
   const totalTax = price * (taxPercentage / 100);
   const totalPrice = price * quantity + totalTax;
   const totalTaxPrice = totalTax * quantity;

   const purchaseData = new FormData();
   purchaseData.append("product_id", product.id);
   purchaseData.append("name", name);
   purchaseData.append("email", email);
   purchaseData.append("phone", phone);
   purchaseData.append("quantity", quantity);
   purchaseData.append("total_price", totalPrice);
   purchaseData.append("total_tax_price", totalTaxPrice);
   purchaseData.append("item_price", price);
   purchaseData.append("item_tax_percentage", taxPercentage);
   purchaseData.append(
     "item_total_price",
     calculateTotalPrice(price, taxPercentage, quantity)
   );

   try {
     const response = await axios.post("/api/purchase", purchaseData);
     console.log(response.data);
     if (response.data.status === 1) {
       alert("Venda Realizada com sucesso.");
     } else {
       alert("Erro na venda");
     }
   } catch (error) {
     console.error(error);
     alert("Erro na venda");
   }
 };


  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-wrap gap-6 justify-center text-black">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="w-full max-w-md mx-auto">
              <img
                src={product.imgurl}
                alt={product.name}
                className="product-image mx-auto"
              />
              <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold">R$ {product.price}</div>
                  <p>QT</p>
                  <div>
                    <input
                      className="text-white text-center"
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(event) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(event.target.value)
                        )
                      }
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-gray-500">Imposto:</div>
                  <div className="text-gray-700">
                    R${" "}
                    {taxPrice(
                      product.price,
                      getTaxPercentage(product.type),
                      quantities[product.id] || 1
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-gray-500">Total:</div>
                  <div className="text-lg font-bold">
                    R${" "}
                    {calculateTotalPrice(
                      product.price,
                      getTaxPercentage(product.type),
                      quantities[product.id] || 1
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() =>
                      handleBuy(product, quantities[product.id] || 1)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>Não há produtos cadastrados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buy;
