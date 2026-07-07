import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/category.api";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [type, setType] = useState("expense");

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Category name is required");
    }

    try {
      if (editingId) {
        await updateCategory(editingId, {
          name,
          type,
        });
      } else {
        await createCategory({
          name,
          type,
        });
      }

      setName("");
      setType("expense");
      setEditingId(null);

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);

    setName(category.name);

    setType(category.type);
  };

  const handleCancel = () => {
    setEditingId(null);

    setName("");

    setType("expense");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {/* Form */}

      <form onSubmit={handleSubmit} className="border rounded p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <div className="mb-4">
          <label className="block mb-2">Category Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Type</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="expense">Expense</option>

            <option value="income">Income</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="border px-4 py-2 rounded">
            {editingId ? "Update Category" : "Add Category"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Categories List */}

      {categories.length === 0 ? (
        <h3>No categories found.</h3>
      ) : (
        categories.map((category) => (
          <div key={category._id} className="border rounded p-4 mb-4">
            <h2 className="text-lg font-semibold">{category.name}</h2>

            <p className="mb-3">Type: {category.type}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(category)}
                className="border px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(category._id)}
                className="border px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Categories;
