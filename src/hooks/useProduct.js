import { useState } from "react";
import { useEffect } from "react";
import api from "../lib/api";

const useProduct = ({ page = 1, limit = 10, search = "", category, brand } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pagination = {
    page,
    limit,
    total: 0,
    totalPages: 0,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product", {
          params: {
            page,
            limit,
            search,
            category,
            brand,
          },
        });
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, limit, search, category, brand]);

  return { products, loading, error, pagination };
};

export default useProduct;
