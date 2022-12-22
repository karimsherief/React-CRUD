import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "https://crud-server-ztq4.onrender.com/products";

const EditProduct = () => {
  // Product info
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();

  // Edit product
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const response = await axios.put(`${API}/${id}`, {
      title: product.title,
      price: product.price,
      description: product.description,
    });

    if (response.status === 200) {
      navigation("/");
    }

    setIsLoading(false);
  }

  // Get products info
  async function getProductDetails(id) {
    const response = await axios.get(`${API}/${id}`);
    const data = await response.data;

    if (response.status === 200) {
      setProduct({ ...data });
    }
    
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  if (isLoading) return "Loading...";

  return (
    <section>
      <h1>Edit Product</h1>
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
            value={product.title || ""}
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
            value={product.description || ""}
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
            value={product.price || 0}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
          />
          <button className="btn btn-info" disabled={isLoading}>
            Edit Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;
