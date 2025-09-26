import { useEffect, useState } from "react";
import api from "../lib/api";

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Adjust the endpoint if your API differs, e.g., "/brands"
        const res = await api.get("/brand");
        const list = res?.data?.brands || res?.data?.data || res?.data?.brand || [];
        setBrands(Array.isArray(list) ? list : []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return { brands, loading, error };
};

export default useBrands;
