import axios from "axios";

import { PRODUCT_LIST, PRODUCT_ERROR } from "./ProductTypes";

export const listProducts = (keyword='', pageNumber = '',sortBy='name',searchByCat='',searchByBrand='') => async (dispatch) => {
    try {
      const { data } = await axios
      .get(`http://localhost:5000/products?keyword=${keyword}&pageNumber=${pageNumber}&sortBy=${sortBy}&searchByCat=${searchByCat}&searchByBrand=${searchByBrand}`);

      dispatch({
        type: PRODUCT_LIST,
        payload: data,
      });
      
    } catch (error) {
      console.log('product error',error)
      dispatch({
        type: PRODUCT_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
