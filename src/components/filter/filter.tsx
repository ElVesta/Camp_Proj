import React, { useState } from "react";
import styles from "./filter.module.css";

import categoryIcon from "../../assets/camp.png";
import seasonIcon from "../../assets/snowflake.png";
import priceIcon from "../../assets/money.png";

export interface FilterValues {
  category: string;
  season: string;
  price: string;
}

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    category: "all",
    season: "all",
    price: "all",
  });

  const updateFilter = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterItem}>
        <div className={styles.filterHeader}>
          <img src={categoryIcon} alt="" className={styles.icon} />
          <span className={styles.title}>Категория</span>
        </div>
        <select
          className={styles.valueSelect}
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="all">Все</option>
          <option value="tent">Палатки</option>
          <option value="backpack">Рюкзаки</option>
          <option value="sleeping">Спальники</option>
          <option value="cooking">Посуда</option>
          <option value="clothing">Одежда</option>
          <option value="gear">Снаряжение</option>
        </select>
      </div>

      <div className={styles.filterItem}>
        <div className={styles.filterHeader}>
          <img src={seasonIcon} alt="" className={styles.icon} />
          <span className={styles.title}>Сезон года</span>
        </div>
        <select
          className={styles.valueSelect}
          value={filters.season}
          onChange={(e) => updateFilter("season", e.target.value)}
        >
          <option value="all">Все</option>
          <option value="summer">Лето</option>
          <option value="winter">Зима</option>
          <option value="spring">Весна</option>
          <option value="autumn">Осень</option>
        </select>
      </div>

      <div className={styles.filterItem}>
        <div className={styles.filterHeader}>
          <img src={priceIcon} alt="" className={styles.icon} />
          <span className={styles.title}>Цена</span>
        </div>
        <select
          className={styles.valueSelect}
          value={filters.price}
          onChange={(e) => updateFilter("price", e.target.value)}
        >
          <option value="all">Любая</option>
          <option value="0-10">до 10 BYN</option>
          <option value="10-20">10–20 BYN</option>
          <option value="20-50">20–50 BYN</option>
          <option value="50+">от 50 BYN</option>
        </select>
      </div>
    </div>
  );
};