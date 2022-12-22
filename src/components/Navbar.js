import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <h2 className="fw-bold">CRUD</h2>
        </NavLink>
        <ul className="navbar-nav flex-row gap-4">
          <li className="nav-item">
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="add" className="nav-link">
              Add Product
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
