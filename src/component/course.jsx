import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addtocart } from '../redux/cart'

const Course = (props) => {
  const { _id, image, titre, createur, actual_Price, discount_Price, rating_Count, rating_Star, category, free } = props;
  const { error } = useSelector(state => state.cart)
  const { status } = useSelector(state => state.cart)
  const { datacart } = useSelector(state => state.cart)
  const user=JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()
  const dispatch = useDispatch();
  console.log(discount_Price, actual_Price)
  return (
    <CourseCard>
      <div className='item-img'>
        <img src={`http://localhost:8000/${image}`} className='row-image' width={"100%"} height={"80%"}/>
      </div>
      <div className='item-body'>
        <h5 className='item-name'>{titre}</h5>
        <span className='item-createur'>{createur?.fullName}</span>
        <div className='item-rating flex' >
          <span className='rating-star-val'>{rating_Star}</span>
          <div style={{ marginTop: "-14px" }}>
            {/* <StarRating rating_star={rating_Star} /> */}
          </div>
          {/* <span className='rating-count' >({rating_Count})</span> */}
        </div>
        <div className='item-price'>
          <span className='item-price-new'>{discount_Price ? discount_Price : actual_Price}€</span>
          <span className='item-price-old'>{discount_Price ? actual_Price : null}€</span>
        </div>
      </div>
       <div className='item-btns flex '>
        <Link to={`/${user?.role==="user" ? "user" :"formateur"}/deatillecours/${_id}`} className="item-btn see-details-btn">
          Voir les détails du cours</Link>
        <button className='item-btn add-to-cart-btn' onClick={() => {
          if (localStorage.getItem("tocken") != null || localStorage.getItem("tocken") != undefined) {
              const existe = datacart.includes(props)
              // localStorage.setItem('datacart',existe ? datacart : [props,...datacart])
              dispatch(addtocart(existe ? datacart : [props, ...datacart]))
            
          } else {
            navigate("/login")
          }

        }} >Acheter cours</button>
      </div> 
    </CourseCard>
  )
}

const CourseCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  // box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #144272;
  .item-body{
    margin: 14px 0;
    padding: 4px 18px;
    

    .item-name{
      font-size: 25px;
      line-height: 1.4;
      font-weight: 800;
      
    }
    .item-createur{
      font-size: 16px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.6);
    
     
    }
    h1, h2, h3, h4, h5, h6{
      letter-spacing: var(--spacing);
      text-transform: capitalize;
    }
    .flex{
      display: flex;
      align-items: center;
  }

}
    .rating-star-val{
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 800;
      color: #b4690e;
      margin-right: 6px; 
       
    }
    
    .rating-count{
      font-size: 12.5px;
      margin-left: 3px;
      font-weight: 500;
      opacity: 0.8;
      
      
      
    }

    .item-price-new{
      font-weight: 700;
      font-size: 18px;
      
    }
    .item-price-old{
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 18px;
      margin-left: 8px;
     
    }
  }
  .item-btns{
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;
    color:white;
    .item-btn{
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn{
        background-color: transparent;
        border: 1px solid #1976d2;
        margin-right: 5px;
        border-radius: 6px;
        color: white;

        &:hover{
          background-color: #1976d2;
          color: white;
        }
      }
      &.add-to-cart-btn{
        background: #1976d2;;
        color: white;
        border: 1px solid #1976d2;
        border-radius: 6px;

        &:hover{
          background-color: transparent;
          color: white;
        }
      }

    }
  }
  
}
}
`;

export default Course