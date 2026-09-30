import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [products, setProducts] = useState([]);

  const [editId, setEditId] = useState(null);


  // =========================
  // GET ALL PRODUCTS
  // =========================

  const getProducts = async () => {

    try {

      const response = await fetch(
        "https://localhost:7015/api/Products"
      );

      if (response.ok) {

        const data = await response.json();

        setProducts(data);

      } else {

        alert("Failed to get products");

      }

    } catch (error) {

      console.error("GET Error:", error);

      alert("Cannot connect to API");

    }

  };


  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {

    getProducts();

  }, []);


  // =========================
  // CLEAR FORM
  // =========================

  const clearForm = () => {

    setProductName("");
    setCategory("");
    setPrice("");
    setStockQuantity("");
    setEditId(null);

  };


  // =========================
  // ADD PRODUCT
  // =========================

  const handleAddProduct = async () => {

    if (!productName || !category || !price || !stockQuantity) {

      alert("Please enter all product details");

      return;

    }


    const product = {

      productName: productName.trim(),
      category: category,
      price: Number(price),
      stockQuantity: Number(stockQuantity)

    };


    try {

      const response = await fetch(
        "https://localhost:7015/api/Products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(product)

        }
      );


      if (response.ok) {

        alert("Product added successfully!");

        clearForm();

        getProducts();

      } else {

        const errorText = await response.text();

        alert(
          "Failed to add product\n\n" +
          "Status: " +
          response.status +
          "\n\n" +
          errorText
        );

      }

    } catch (error) {

      console.error("POST Error:", error);

      alert("Cannot connect to API");

    }

  };


  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEditProduct = (product) => {

    setEditId(product.productId);

    setProductName(product.productName);

    setCategory(product.category);

    setPrice(product.price);

    setStockQuantity(product.stockQuantity);

  };


  // =========================
  // UPDATE PRODUCT
  // =========================

  const handleUpdateProduct = async () => {

    if (!productName || !category || !price || !stockQuantity) {

      alert("Please enter all product details");

      return;

    }


    const product = {

      productName: productName.trim(),
      category: category,
      price: Number(price),
      stockQuantity: Number(stockQuantity)

    };


    try {

      const response = await fetch(

        `https://localhost:7015/api/Products/${editId}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(product)
        }

      );


      if (response.ok) {

        alert("Product updated successfully!");

        clearForm();

        getProducts();

      } else {

        const errorText = await response.text();

        alert(
          "Failed to update product\n\n" +
          "Status: " +
          response.status +
          "\n\n" +
          errorText
        );

      }

    } catch (error) {

      console.error("UPDATE Error:", error);

      alert("Cannot connect to API");

    }

  };


  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDeleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) {

      return;

    }


    try {

      const response = await fetch(

        `https://localhost:7015/api/Products/${id}`,

        {
          method: "DELETE"
        }

      );


      if (response.ok) {

        alert("Product deleted successfully!");

        getProducts();

      } else {

        const errorText = await response.text();

        alert(
          "Failed to delete product\n\n" +
          "Status: " +
          response.status +
          "\n\n" +
          errorText
        );

      }

    } catch (error) {

      console.error("DELETE Error:", error);

      alert("Cannot connect to API");

    }

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="container">


      {/* =========================
          HEADER
          ========================= */}

      <div className="page-header">

        <h1>
          Product Management System
        </h1>

        <p>
          Manage your products easily
        </p>

      </div>


      {/* =========================
          FORM TITLE
          ========================= */}

      <h2>

        {editId === null
          ? "Add Product"
          : "Edit Product"
        }

      </h2>


      {/* =========================
          FORM
          ========================= */}

      <div className="form-container">


        {/* PRODUCT NAME */}

        <div className="form-group">

          <label>
            Product Name
          </label>

          <input
            type="text"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
            placeholder="Enter product name"
          />

        </div>


        {/* CATEGORY */}

        <div className="form-group">

          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="">
              Select Category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Grocery">
              Grocery
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* PRICE */}

        <div className="form-group">

          <label>
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Enter price"
          />

        </div>


        {/* STOCK */}

        <div className="form-group">

          <label>
            Stock Quantity
          </label>

          <input
            type="number"
            value={stockQuantity}
            onChange={(e) =>
              setStockQuantity(e.target.value)
            }
            placeholder="Enter stock quantity"
          />

        </div>


        {/* =========================
            FORM BUTTONS
            ========================= */}

        <div className="form-buttons">

          {editId === null ? (

            <button
              className="add-btn"
              type="button"
              onClick={handleAddProduct}
            >
              Add Product
            </button>

          ) : (

            <button
              className="update-btn"
              type="button"
              onClick={handleUpdateProduct}
            >
              Update Product
            </button>

          )}


          {editId !== null && (

            <button
              className="cancel-btn"
              type="button"
              onClick={clearForm}
            >
              Cancel
            </button>

          )}

        </div>

      </div>


      {/* =========================
          PRODUCT LIST
          ========================= */}

      <div className="list-header">

        <h2>
          Product List
        </h2>

        <span className="product-count">

          {products.length} Products

        </span>

      </div>


      {/* =========================
          TABLE
          ========================= */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>
                ID
              </th>

              <th>
                Product Name
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Stock Quantity
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="no-products"
                >
                  No products available
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr key={product.productId}>

                  <td>
                    <span className="id-badge">
                      #{product.productId}
                    </span>
                  </td>


                  <td className="product-name">

                    {product.productName}

                  </td>


                  <td>

                    <span className="category-badge">

                      {product.category}

                    </span>

                  </td>


                  <td className="price">

                    ₹{product.price}

                  </td>


                  <td className="stock">

                    {product.stockQuantity}

                  </td>


                  <td>

                    <button
                      className="edit-btn"
                      type="button"
                      onClick={() =>
                        handleEditProduct(product)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() =>
                        handleDeleteProduct(
                          product.productId
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default App;