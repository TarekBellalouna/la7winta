import { useState,useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../../redux/Product/ProductAction'
import {useParams} from 'react-router-dom'
import {addParams} from '../../redux/search/searchActions.js'
import axios from 'axios'

import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import logo from "../../assets/img/logo.png";
import "./MiddleHeader.scss";

function MiddleHeader({ history,location }) {
  const context = useContext(CartContext);
  const Aucontext = useContext(AuthContext);
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("");
  const [catList,setCatList] = useState([])
  useEffect( ()=>{
    const getData = async() => { 
      const {data} = await axios.get(`http://127.0.0.1:5000/category`)
    console.log(data)
    setCatList(data)
     }
     getData()
   },[])
   const search = useSelector(state=>state.search)
   const handleOption = (cat) => { 
     const params = location.pathname.split('/')[2]
     console.log(params)
    dispatch(listProducts(params,search.pageNumber,search.sortBy,cat,search.searchByBrand));
    dispatch(addParams(params, search.pageNumber,search.sortBy,cat,search.searchByBrand))
   }
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/shop/${keyword}`);
    } else {
      history.push("/");
    }
  };
 
  
  return (
    <div className="middle-header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="middle-header-logo">
              <Link to="/">
                <img src={logo} alt="image" />
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="middle-header-search">
              <form onSubmit={submitHandler}>
                <div className="row align-items-center">
                  <div className="col-md-4 select-column">
                  <div className="form-group">
                    <select
                      className="form-control"
                      onChange={(e) => handleOption(e.target.value)}
                    >
                      <option value=''>Category</option>
                      {catList && catList.map(cat =><option key={cat._id} value={cat.name}>{cat.name}</option>)}
                      
                      
                    </select>
                  </div>
                  </div>

                  <div className="col-md-8">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search product..."
                        name="q"
                        onChange={(e) => {
                          setKeyword(e.target.value);

                        }}
                      />
                      <button type="submit">
                        <i className="bx bx-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-3">
            <ul className="middle-header-optional">
              {Aucontext.token &&
                <li>
                  <Link to="/wishlist">
                    <i className="flaticon-heart"></i>
                  </Link>
                </li> 
              }
              <li>
                <Link to="/cart">
                  <i className="flaticon-shopping-cart"></i>
                  {context.cartItems && context.cartItems.length > 0 && (
                    <span>{context.cartItems.length}</span>
                  )}
                </Link>
              </li>
              <li>
                $
                {context.cartItems &&
                  context.cartItems.reduce((count, curItem) => {
                    return (
                      count +
                      parseInt(curItem.price) * parseInt(curItem.quantity || 0)
                    );
                  }, 0)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MiddleHeader);
