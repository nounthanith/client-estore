import { useEffect, useState } from "react";
import api from "../lib/api";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category");
        const list = res?.data?.categories || res?.data?.data || res?.data?.category || [];
        setCategories(Array.isArray(list) ? list : []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
