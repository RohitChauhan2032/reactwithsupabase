import { useState } from "react";
import { toast } from "react-toastify";
import { CreateProduct, UploadImage } from "../../services/ProductServices";


const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        imageUrl = await UploadImage(image);
      }

      const { error } = await CreateProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image_url: imageUrl,
      });

      // console.log(error.message)
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Product Added Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
      });

      setImage(null);
    } catch (error) {
      
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="mb-4 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Product Image
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;