import { useState, useEffect, useCallback } from "react";
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { useProducts } from '../../contexts/ProductsContext';
import { Card } from '../../components/card/card';
import { Filters } from '../../components/filter/filter';
import { SortButton } from '../../components/sortButton/sortButton';
import { useTheme } from '../../contexts/ThemeContext';
import type { FilterValues } from '../../components/filter/filter';
import type { SortType } from '../../components/sortButton/sortButton';
import styles from './catalog.module.css';

const initialFilters: FilterValues = {
  category: "all",
  season: "all",
  price: "all",
};

const PRODUCTS_PER_PAGE = 6;
const PRODUCTS_PER_LOAD_MORE = 3;

export const CatalogPage = () => {
  const { products, loading, error } = useProducts();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentFilters, setCurrentFilters] = useState<FilterValues>(initialFilters);
  const [sortType, setSortType] = useState<SortType>('name-asc');
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [filtersKey, setFiltersKey] = useState(0);

  const [hoverReset, setHoverReset] = useState(false);
  const [hoverApply, setHoverApply] = useState(false);
  const [hoverMore, setHoverMore] = useState(false);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...products];
    
    if (currentFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category === currentFilters.category);
    }
    
    if (currentFilters.season !== 'all') {
      filtered = filtered.filter(p => p.season === currentFilters.season || p.season === 'all');
    }
    
    if (currentFilters.price !== 'all') {
      const [min, max] = currentFilters.price.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      } else if (currentFilters.price === '50+') {
        filtered = filtered.filter(p => p.price >= 50);
      }
    }
    
    if (search) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      switch (sortType) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
    
    setFilteredProducts(filtered);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [products, currentFilters, search, sortType]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, visibleCount));
  }, [filteredProducts, visibleCount]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + PRODUCTS_PER_LOAD_MORE);
  };

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const handleFilterChange = (filters: FilterValues) => {
    setCurrentFilters(filters);
  };

  const handleSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  const handleResetFilters = () => {
    setCurrentFilters(initialFilters);
    setFiltersKey(prev => prev + 1);
    setSearch('');
  };

  const handleApplyFilters = () => {
    applyFiltersAndSort();
  };

  const getButtonStyle = (isHovered: boolean) => {
    if (isDark) {
      return {
        background: isHovered ? '#ffffff' : 'transparent',
        border: '3.88px solid #ffffff',
        color: isHovered ? '#434e6f' : '#ffffff',
        borderRadius: '10px',
        fontSize: '26px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        height: '66px',
        padding: '0 20px',
        cursor: 'pointer',
        width: '388px',
        transition: 'all 0.3s ease'
      };
    } else {
      return {
        background: isHovered ? '#434e6f' : 'transparent',
        border: '3.88px solid #434e6f',
        color: isHovered ? '#ffffff' : '#434e6f',
        borderRadius: '10px',
        fontSize: '26px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        height: '66px',
        padding: '0 20px',
        cursor: 'pointer',
        width: '388px',
        transition: 'all 0.3s ease'
      };
    }
  };

  if (loading) return <div className={styles.loading}>Загрузка товаров...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.catalogPage}>
      <Header/>
      <Container>
        <h2 
          className={styles.title}
          style={{ color: isDark ? '#ffffff' : '#434e6f' }}
        >
          Каталог
        </h2>
        
        <div className={styles.filterBar}>
          <Filters 
            key={filtersKey}
            onFilterChange={handleFilterChange} 
          />
          <SortButton onSortChange={handleSortChange} />
        </div>
        
        <div className={styles.actionButtons}>
          <button
            onClick={handleResetFilters}
            style={getButtonStyle(hoverReset)}
            onMouseEnter={() => setHoverReset(true)}
            onMouseLeave={() => setHoverReset(false)}
          >
            Сбросить фильтры
          </button>
          <button
            onClick={handleApplyFilters}
            style={getButtonStyle(hoverApply)}
            onMouseEnter={() => setHoverApply(true)}
            onMouseLeave={() => setHoverApply(false)}
          >
            Подобрать товар
          </button>
        </div>
        
        <div 
          className={styles.resultsCount}
          style={{ color: isDark ? '#ffffff' : '#666666' }}
        >
          Найдено: {filteredProducts.length} товаров
        </div>
        
        <div className={styles.grid}>
          {displayedProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.thumbnail}
            />
          ))}
        </div>
        
        {hasMoreProducts && (
          <div className={styles.moreButtonWrapper}>
            <button
              onClick={handleLoadMore}
              style={getButtonStyle(hoverMore)}
              onMouseEnter={() => setHoverMore(true)}
              onMouseLeave={() => setHoverMore(false)}
            >
              Подробнее...
            </button>
          </div>
        )}
      </Container>
      <Footer/>
    </div>
  );
};