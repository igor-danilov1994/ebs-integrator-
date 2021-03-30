import React, { useEffect, useState, useRef, useContext, ReactPortal } from 'react';
import s from './ProductList.module.css';
import SortComponent from '../SortComponent/SortComponent';
import check from '../../img/checked.svg';
import Context from '../../index';

interface Product {
  name: string;
  category: Category;
  price: number;
  id: number
}

interface Category {
  id: string
  name: string
}

interface isCheckedProduct {
  id: number
  count: number
}

interface ProductListPropsType {
  getCurrentProduct: (item: Product) => void
  deleteProductToBasket: (id: number) => void
  isChecked: Array<isCheckedProduct>
}

const ProductList: React.FC<ProductListPropsType> = ({
                                                       getCurrentProduct,
                                                       deleteProductToBasket,
                                                       isChecked,
                                                     }) => {

  const state = useContext(Context);
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);

  const [showSortCategory, setShowSortCategory] = useState(false);
  const [checkSortCategory, setCheckSortCategory] = useState<string | null>(null);

  const sortCategoryBlock = useRef(null);

  useEffect(() => {
    if (state.length > 0) {
      setProduct(state[1]);
      setCategory(state[0]);
    }
  }, [state]);

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: any ): void => {
    if (!e.path.includes(sortCategoryBlock.current)) {
      setShowSortCategory(false);
    }
  };

  let sortPrice = (value: string): void => {
    let newDataProduct = product.concat();

    if (value === 'up') {
      newDataProduct.sort((a: Product, b: Product) => b.price - a.price);
    } else if (value === 'down') {
      newDataProduct.sort((a: Product, b: Product) => a.price - b.price);
    }
    setProduct(newDataProduct);
  };

  let sortCategory = (id: string): void => {
    if (checkSortCategory !== id) {
      setCheckSortCategory(id);
      setProduct(arr => arr.filter((item: Product) => item.category.id === id));
    } else {
      setProduct(state[1])
      setCheckSortCategory(null);
      setShowSortCategory(!showSortCategory)
    }
  };

  return (
    <div className={s.productList}>
      <h1>Product List</h1>
      <table>
        <thead>
        <tr>
          <td className={s.productList_category}> Category
            <span onClick={() => setShowSortCategory(!showSortCategory)}
                  className={`${s.sortArrow} ${s.productList_sortUp}`}> </span>
            {showSortCategory &&
            <div ref={sortCategoryBlock}
                 className={s.productList_category__SortBlock}>

              {category.map((item: Category) =>
                <div key={item.id} className={s.productList_category__box}>
                  <input onChange={(e) =>
                    sortCategory(item.id)} checked={checkSortCategory === item.id} id={item.id} type='checkbox' />
                  <label htmlFor={item.id}> {item.name}  </label>
                </div>,
              )}

            </div>}
          </td>
          <td>Name</td>
          <td className={s.productList_sort}>Price
            <SortComponent sortData={sortPrice} />
          </td>
          <td>Actions</td>
        </tr>
        </thead>
        <tbody>

        {product.map((currentProduct: Product, index: number) =>
          <tr key={currentProduct.id}>
            <td>{currentProduct.category.name}</td>
            <td>{currentProduct.name}</td>
            <td> ${currentProduct.price}</td>
            <td>
              <button onClick={() => getCurrentProduct(currentProduct)}>+</button>
              <span> Select </span>
              <button onClick={() => deleteProductToBasket(currentProduct.id)}>-</button>
            </td>
            {isChecked.find(item => item.id === currentProduct.id) &&
            <td className={s.productList_checkBlock}>
              <img className={s.productList_checked} src={check} alt='check' />
            </td>}
          </tr>)}
        </tbody>
      </ table>
    </div>
  );
};

export default ProductList;
