// src/api/ecommerceAPI.js
import axios from 'axios';

const BASE_URL = 'https://ansummit.mollasonsgroup.com/ecommerce/api/v1';

export const getProducts = () => axios.get(`${BASE_URL}/products`);
export const getCategories = () => axios.get(`${BASE_URL}/categories`);
