import React, { useRef } from 'react';

const baseUrl = 'http://localhost:3001/api'

export const getProduct = async () => {
  let response = await fetch(`${baseUrl}/products/`);
  if (response.status === 200) {
    let commits = await response.json();
    return commits;
  }
};

export const getCategories = async () => {
  let response = await fetch(`${baseUrl}/product/categories/`);
  if (response.status === 200) {
    let commits = await response.json();
    return commits;
  }
};

