import React, { useRef } from 'react';

export const getProduct = async () => {
  let response = await fetch('http://localhost:3001/api/products/');
  if (response.status === 200) {
    let commits = await response.json();
    return commits;
  }
};

