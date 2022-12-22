import axios from "axios";

import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const API = "https://crud-server-ztq4.onrender.com/products";

const ProductDetails = () => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  async function handleDelete(id) {
    const response = await axios.delete(`${API}/${id}`);

    if (response.status === 200) {
      navigate("/");
    }
  }

  async function getProductDetails(id) {
    setLoading(true);

    const response = await axios(`${API}/${id}`);
    const data = await response.data;

    if (response.status === 200) {
      setDetails(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  if (loading) return "Loading...";

  return (
    <section className="details-section d-flex flex-column gap-3">
      <h1>Product #{details.id} Details</h1>
      <div className="d-flex flex-wrap align-items-center gap-2">
        <h2>Title: </h2>
        <p className="m-0">{details.title || "Untitled"}</p>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        <h2>Description: </h2>
        <p className="m-0">{details.description || "No description"}</p>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        <h2>Price: </h2>
        <p className="m-0">{details.price || 0} $</p>
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        <NavLink className="btn btn-info btn-sm" to={`../edit/${id}`}>
          Edit
        </NavLink>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
