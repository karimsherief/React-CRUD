import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const URL = "https://crud-server-ztq4.onrender.com/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  async function getProducts() {
    const response = await axios.get(URL);

    const data = await response.data;

    if (response.status === 200) {
      setLoading(false);
      setProducts(data);
    }
  }

  async function handleDelete(id) {
    const response = await axios.delete(`${URL}/${id}`);

    if (response.status === 200) {
      getProducts();
    }
  }

  if (loading) return "Loading...";

  return (
    <section className="products-section">
      <h2>Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col" className="text-center">
              Price
            </th>
            <th scope="col" className="text-center">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.title || "Untitled"}</td>
              <td className="text-center text-nowrap">
                {product.price || 0} $
              </td>
              <td className="text-center d-flex align-items-md-center justify-content-md-center gap-2 flex-column flex-md-row">
                <NavLink
                  className="btn btn-primary btn-sm "
                  to={`/${product.id}`}
                  details={product}
                >
                  View
                </NavLink>
                <NavLink
                  className="btn btn-info btn-sm"
                  to={`/edit/${product.id}`}
                >
                  Edit
                </NavLink>
                <button
                  className="btn btn-danger btn-sm "
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Products;
