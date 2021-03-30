import React, { useEffect, useRef, useState } from 'react';
import s from '../ ProductList/ProductList.module.css';

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

interface isCheckedProduct {
  id: number
  count: number
}

interface BasketPropsType {
  productToBasket: Array<Product>
  deleteProductID: number
  isChecked: Array<isCheckedProduct>
  deleteProductToBasket: (id: number) => void
}

const Basket: React.FC<BasketPropsType> = ({
                                             productToBasket, deleteProductID,
                                             isChecked, deleteProductToBasket,
                                           }) => {

  const [currentProduct, setCurrentProduct] = useState<Product[]>([]);


  useEffect(() => {
    //debugger
    if (deleteProductID) {
      const newArr = currentProduct.filter(item => item.id !== deleteProductID);
      setCurrentProduct(newArr);
    }
  }, [deleteProductID]);

  useEffect(() => {
    if (productToBasket.length > 0) {
      if (!currentProduct.includes(productToBasket[0])) {
        setCurrentProduct(arr => [...arr, productToBasket[0]]);
      }
    }
  }, [productToBasket]);


  let deleteElement = (id: number) => {
    isChecked.find((item: isCheckedProduct) => {
      if (item.id === id) {
        if (item.count! <= 1)
          currentProduct.filter(item => item.id !== id);

        //фильтруем isChecked и исключаем item у которго count не валидный
        isChecked.find(item => item.id === id);
        //setCurrentProduct(newArray);
      } else {
        deleteProductToBasket(id);
      }
    });
  };

  return (
    <div className={s.productList}>
      <h1>Basket</h1>
      {currentProduct.length > 0 &&
      <table>
        <thead>
        <tr>
          <td>Category</td>
          <td>Name</td>
          <td>Quantity</td>
          <td>Price ^</td>
          <td>Actions</td>
        </tr>
        </thead>
        <tbody>
        {currentProduct.map((productItem: Product, index: number) =>
          <tr key={productItem.id}>
            <td>{productItem.category.name}</td>
            <td>{productItem.name}</td>
            <td> {isChecked[index].count} </td>
            <td>{productItem.price}</td>
            <td>
              <button onClick={() => deleteElement(productItem.id)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </ table>}
    </div>
  );
};

export default Basket;

