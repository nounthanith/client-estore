import { useState } from "react";
import { useEffect } from "react";
import api from "../lib/api";

const useIsFeatured = () => {
  const [isFeatured, setIsFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/featured");
        const products = response?.data?.products ?? [];
        setIsFeatured(products);
        // console.log("Featured products:", products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { isFeatured, loading, error };
};

export default useIsFeatured;
