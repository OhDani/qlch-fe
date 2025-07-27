// import { useEffect, useState } from 'react';
// import { productService } from '../services/productService';

// export const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     productService
//       .getAll()
//       .then(setProducts)
//       .catch(setError)
//       .finally(() => setLoading(false));
//   }, []);

//   return { products, loading, error };
// };
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts();
        setProducts(res);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { products, loading };
};

export default useProducts;
