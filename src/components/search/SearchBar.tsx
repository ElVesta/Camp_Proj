import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductsContext';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/searh.svg';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          className={styles.searchInput}
        />
        <img src={searchIcon} alt="Поиск" className={styles.searchIcon} />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className={styles.suggestionsDropdown}>
          {suggestions.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={styles.suggestionItem}
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
            >
              <img src={product.thumbnail} alt={product.title} className={styles.suggestionImage} />
              <div className={styles.suggestionInfo}>
                <div className={styles.suggestionTitle}>{product.title}</div>
                <div className={styles.suggestionPrice}>{product.price.toFixed(2)} BYN</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};