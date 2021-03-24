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

interface BasketPropsType {
  productToBasket: Array<Product>
  deleteProductID: number
  unChecked: (id: number) => void
}

const Basket: React.FC<BasketPropsType> = ({ productToBasket, deleteProductID, unChecked }) => {
  //debugger
  const [currentProduct, setCurrentProduct] = useState<Array<Product>>([]);
  const [indexItem, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const product = useRef<Array<Product>>([]);

  useEffect(() => {
    //debugger
    if(productToBasket.length === 1){
      debugger
      product.current.push(productToBasket[0]);
      setCurrentProduct(product.current);
      setIndex(indexItem + 1);
    }

    if (productToBasket.length > 0) {
      currentProduct.forEach((item: Product) => {
        debugger
        if (item.id !== productToBasket[0].id) {
          //debugger
          // @ts-ignore
          //product.current.push(productToBasket[0]);
          //setCurrentProduct(product.current);
          //setIndex(indexItem + 1);
        } else {
          //debugger
        }
      });
    }
  }, [productToBasket]);

  let deleteElement = (index: number, id: number) => {
    product.current.splice(index, 1);
    setCurrentProduct(product.current);
    unChecked(id)
    setIndex(product.current.length);
  };

  useEffect(() => {
    if (deleteProductID) {
      product.current.forEach((item: Product, index: number) => {
        if (item.id === deleteProductID) {
          deleteElement(index, item.id);
        }
      });
    }
  }, [deleteProductID]);

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
        {currentProduct.map((currentProduct: Product, index: number) =>
          <tr key={currentProduct.id}>
            <td>{currentProduct.category.name}</td>
            <td>{currentProduct.name}</td>
            <td> {count} </td>
            <td>{currentProduct.price}</td>
            <td>
              <button onClick={() => deleteElement(index, currentProduct.id)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </ table>}
    </div>
  );
};

export default Basket;

