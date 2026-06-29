import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteProduct, GetProducts } from "../../services/ProductServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);

    const { data, error } = await GetProducts();

    if (error) {
      toast.error(error.message);
    } else {
      setProducts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const { error } = await DeleteProduct(id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product Deleted");
      fetchProducts();
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Products...</h4>
      </div>
    );
  }
  console.log(products)

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>

        <Link
          to="/adminDashboard/add-product"
          className="btn btn-primary"
        >
          Add Product
        </Link>
      </div>

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created</th>
              <th width="170">Action</th>
            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id}>

                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={product.image_url}
                      alt={product.title}
                      width="70"
                      height="70"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td>{product.title}</td>

                  <td style={{ maxWidth: 250 }}>
                    {product.description}
                  </td>

                  <td>
                    ₹ {product.price}
                  </td>

                  <td>
                    {product.stock}
                  </td>

                  <td>
                    {new Date(product.created_at).toLocaleDateString()}
                  </td>

                  <td>

                    <Link
                      to={`/admin/edit-product/${product.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
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
};

export default ProductList;