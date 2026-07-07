import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/transaction.api";

import { getCategories } from "../api/category.api";

function Transactions() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateTransaction(editingId, data);
      } else {
        await createTransaction(data);
      }

      console.log("Success");
      await fetchTransactions();

      reset({
        amount: "",
        categoryId: "",
        type: "",
        transactionDate: "",
        description: "",
      });

      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions({
        page: 1,
        limit: 10,
      });

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) {
      return;
    }

    try {
      await deleteTransaction(id);

      await fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);

    setValue("amount", transaction.amount);

    setValue("categoryId", transaction.categoryId._id);

    setValue("type", transaction.type);

    setValue("transactionDate", transaction.transactionDate.split("T")[0]);

    setValue("description", transaction.description || "");
  };

  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) return;

    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId,
    );
    //console.log(selectedCategory)

    if (selectedCategory) {
      setValue("type", selectedCategory.type);
    }
  }, [selectedCategoryId, categories, setValue]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg p-6 mt-6"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            className="w-full border rounded p-2"
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
          />

          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Category</label>

          <select
            className="w-full border rounded p-2"
            {...register("categoryId", {
              required: "Category is required",
            })}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Type</label>

          <input
            type="text"
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            {...register("type")}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Transaction Date</label>

          <input
            type="date"
            className="w-full border rounded p-2"
            {...register("transactionDate", {
              required: "Transaction date is required",
            })}
          />

          {errors.transactionDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transactionDate.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            rows="3"
            placeholder="Enter description"
            className="w-full border rounded p-2"
            {...register("description")}
          />
        </div>

        <button type="submit" className="border rounded px-5 py-2">
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);

              reset({
                amount: "",
                categoryId: "",
                type: "",
                transactionDate: "",
                description: "",
              });
            }}
            className="border px-5 py-2 rounded ml-3"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction._id} className="border rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">₹{transaction.amount}</h3>

              <p>Category: {transaction.categoryId.name}</p>

              <p>Type: {transaction.type}</p>

              <p>
                Date:{" "}
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </p>

              <p>Description: {transaction.description || "-"}</p>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => handleEdit(transaction)}
                  className="border px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(transaction._id)}
                  className="border px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;
