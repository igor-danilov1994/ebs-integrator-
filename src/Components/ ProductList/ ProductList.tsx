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
  setProductToBasket: (index: number, id: number) => void
  deleteProductToBasket: (id: number) => void
  isChecked: Array<number>
}

const ProductList: React.FC<ProductListPropsType> = ({ setProductToBasket, product, deleteProductToBasket, isChecked }) => {

  const [allProduct, setAllProduct] = useState(product)

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

  let sortCategory = (value: string) => {
    let newDataProduct = product.concat();
    newDataProduct.sort();

    if (value === 'down') {
      newDataProduct.reverse();
    }
    setAllProduct(newDataProduct);
  };

  let addToBasket = (index: number, id: number) => {
    setProductToBasket(index, id);
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
          <td className={s.productList_sort}>Category
            <SortComponent sortData={sortCategory} />
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
              <button onClick={() => addToBasket(index, currentProduct.id )}>+</button>
              <span> Select </span>
              <button onClick={() => deleteToToBasket(currentProduct.id)}>-</button>
            </td>
            {isChecked.includes(currentProduct.id) &&<img className={s.productList_checked} src={check} alt='check' />}
          </tr>)}
        </tbody>
      </ table>
    </div>
  );
};

export default ProductList;
