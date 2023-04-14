import React, { useState, useEffect } from "react";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

function Register() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState("");
  const [typeTaxes, setTypeTaxes] = useState("");
  const [image, setImage] = useState(null);
  const [typeName, setTypeName] = useState("");
  const [hasTypes, setHasTypes] = useState(false);

  useEffect(() => {
    axios
      .post("/api/get/types")
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          setHasTypes(true);
          setTypes(res.data.types);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Adicionando validações para os campos do formulário
    if (!name || !description || !price || !type || !image) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", sanitizeHtml(name));
    formData.append("description", sanitizeHtml(description));
    formData.append("price", sanitizeHtml(price));
    formData.append("type", sanitizeHtml(type));
    formData.append("image", image);

    axios
      .post("/api/create/product", formData)
      .then((res) => {
        console.log(res.data);
         if (res.data.status === 1) {
          alert("Produto Criado com sucesso!")
         }
         if (res.data.status === 0) {
           alert("Ocorreu um Erro!");
         }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitType = (e) => {
    e.preventDefault();

    // Adicionando validações para os campos do formulário
    if (!typeName || !typeTaxes) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("typeName", sanitizeHtml(typeName));
    formData.append("typeTaxes", sanitizeHtml(typeTaxes));

    axios
      .post("/api/create/type", formData)
      .then((res) => {
        if (res.data.status === 1) {
          alert('Tipo Criado com Sucesso!')
          setHasTypes(true);
          axios
            .post("/api/get/types")
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 1) {
                setHasTypes(true);
                setTypes(res.data.types);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (res.data.status === 0) {
          alert("Ocorreu um Erro!");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmitType}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <p className="block text-white font-bold mb-2">
          Cadastro de tipos de produtos:
        </p>
        <div className="mb-4">
          <label htmlFor="typeName" className="block text-white font-bold mb-2">
            Nome do tipo:
          </label>
          <input
            type="text"
            id="typeName"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="typeTaxes"
            className="block text-white font-bold mb-2"
          >
            Imposto do tipo(Porcentagem sem o sinal):
          </label>
          <input
            type="number"
            id="typeTaxes"
            value={typeTaxes}
            onChange={(e) => setTypeTaxes(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cadastrar tipo
          </button>
        </div>
      </form>
      {!hasTypes && (
        <p className="block text-white font-bold mb-2">
          Cadastre algum tipo, para poder cadastar os produtos.
        </p>
      )}
      {hasTypes && (
        <form
          onSubmit={handleSubmit}
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p className="block text-white font-bold mb-2">
            Cadastro de produtos:
          </p>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-white font-bold mb-2"
            >
              Descrição:
            </label>
            <textarea
              id="description"
              value={description}
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-white font-bold mb-2">
              Preço:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-white font-bold mb-2">
              Tipo:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            >
              {types &&
                types.map((type) => (
                  <>
                    <option value="" disabled selected>
                      Adicione um tipo
                    </option>
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  </>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-white font-bold mb-2">
              Imagem:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Cadastrar produto
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;
