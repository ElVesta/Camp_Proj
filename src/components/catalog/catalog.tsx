import React from "react";
import { useProducts } from '../../contexts/ProductsContext';
import { Card } from "../card/card";
import styles from "./catalog.module.css";

export const Catalog: React.FC = () => {
  const { products, loading } = useProducts();
  const displayProducts = products.slice(0, 6);

  if (loading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.grid}>
        {displayProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            image={product.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};