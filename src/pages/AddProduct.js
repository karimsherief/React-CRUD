import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://crud-server-ztq4.onrender.com/products";

const AddProduct = () => {
  // Product info
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const response = await axios.post(API, {
      title: product.title,
      price: product.price,
      description: product.description,
    });

    if (response.status === 201) {
      navigation("/");
    }

    setIsLoading(false);
  }

  return (
    <section>
      <h2>Add Product</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container-fluid">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            id="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Description"
            id="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          ></textarea>
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="price"
            id="description"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
          />
          <button className="btn btn-primary" disabled={isLoading}>
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
