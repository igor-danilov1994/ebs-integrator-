import React, { useEffect, useState } from 'react';
import s from './ProductList.module.css';
import SortComponent from '../SortComponent/SortComponent';
import check from '../../img/checked.svg';

export interface Category {
  id: string
  name: string
}

export interface Product {
  name: string;
  category: Category;
  price: number;
  id: number
}

interface ProductListPropsType {
  product: Array<Product>
  setProductToBasket: (id: number, categoriesName: string, item: Product) => void
  deleteProductToBasket: (id: number) => void
  isChecked: Array<number>
  category: Array<Category>
}

const ProductList: React.FC<ProductListPropsType> = ({
                                                       category,
                                                       setProductToBasket,
                                                       product,
                                                       deleteProductToBasket,
                                                       isChecked,
                                                     }) => {

  const [allProduct, setAllProduct] = useState(product);

  const [showSortCategory, setShowSortCategory] = useState(false);

  useEffect(() => {
    setAllProduct(product);
  }, [product]);

  let sortPrice = (value: string) => {
    let newDataProduct = product.concat();

    if (value === 'up') {
      newDataProduct.sort((a: Product, b: Product) => b.price - a.price);
    } else if (value === 'down') {
      newDataProduct.sort((a: Product, b: Product) => a.price - b.price);
    }

    setAllProduct(newDataProduct);
  };


  let sortCategory = (id: string) => {
     let newArr = allProduct.filter( (item) => {
      return item.category.id === id
    } )
    setAllProduct(newArr);
  };

  let addToBasket = (id: number, categoriesName: string, item: Product) => {
    setProductToBasket(id, categoriesName, item);
  };

  let deleteToToBasket = (id: number) => {
    deleteProductToBasket(id);
  };

  return (
    <div className={s.productList}>
      <h1>Product List</h1>
      <table>
        <thead>
        <tr>
          <td className={s.productList_category}> Category
            <span onClick={ () =>setShowSortCategory(!showSortCategory)} className={`${s.sortArrow} ${s.productList_sortUp}`}> </span>
            {showSortCategory &&
            <div className={s.productList_category__SortBlock}>

              {category.map((item: Category) =>
                <div className={s.productList_category__box}>
                  <input onClick={ () => sortCategory(item.id)} name={item.name} id={item.id} type='checkbox'/>
                  <label htmlFor={item.id}> {item.name} ( {item.id} ) </label>
                </div>
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
        {allProduct.map((currentProduct: Product, index: number) =>
          <tr key={currentProduct.id}>
            <td>{currentProduct.category.name}</td>
            <td>{currentProduct.name}</td>
            <td> ${currentProduct.price}</td>
            <td>
              <button onClick={() => addToBasket(currentProduct.id, currentProduct.name, currentProduct) }>+</button>
              <span> Select </span>
              <button onClick={() => deleteToToBasket(currentProduct.id)}>-</button>
            </td>
            {isChecked.includes(currentProduct.id) && <img className={s.productList_checked} src={check} alt='check' />}
          </tr>)}
        </tbody>
      </ table>
    </div>
  );
};

export default ProductList;
