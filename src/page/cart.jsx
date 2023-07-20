

import './cart.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch,useSelector } from 'react-redux';
import  {supptocart,cartaction} from '../redux/cart'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import  {Addorder} from '../redux/cart'

const Cart=()=>{
  const {error} = useSelector(state=>state.cart)
  const {status} = useSelector(state=>state.cart)
  const {datacart} = useSelector(state=>state.cart)
  const [dataCart,setDataCart] = useState(datacart)
  const [supp,setsupp] = useState([])
  const dispatch = useDispatch();
  const user=JSON.parse(localStorage.getItem('user'));
  let total=0;
  const handleCheckout = () => {
    // axios
    //   .post(`http://localhost:8000/create-checkout-session`, {
    //     datacart,
    //     userId: localStorage.getItem('userid'),
    //   })
    //   .then((response) => {
    //     if (response.data.url) {
    //       let tabidcour=[]
    //       let users=JSON.parse(JSON.stringify(user.user))
    //        dataCart.map((item) => {
    //         dispatch(getCourById(item._id)).then((secc)=>{
    //                dispatch(updatecour({_id:item._id,nb_user:secc.payload.Courses?.nb_user +1}))})
       
    //         tabidcour.push(item._id)
    //         const existe=users.Courses.includes(item)
    //         console.log(existe,item._id)
    //         if(!existe)
    //         {
    //          users.Courses.push(item._id)
    //         }
    //       })
    //       const dataOrder={
    //         orderDate:new Date(),
    //         user:localStorage.getItem("userid"),
    //         Cours:tabidcour,
    //         montant:total
         
    //      }
    //       console.log(dataOrder)
    //         dispatch(updateprofilequiz(users))
    //         dispatch(Addorder(dataOrder))
    //         setTimeout(() => {
    //           window.location.href = response.data.url;
    //         }, 1000) 
    //     }
    //   })
    //   .catch((err) => console.log(err.message));
  };
    return  (<>
    <div className="card" style={{backgroundColor: "#144272",padding: "27px"}}>
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px",marginBottom:"10px" }}>
            <h2 style={{fontSize:"2rem"}}>Accéder au panier</h2>
        </div>
        <div className="card-body">
            <div className="table-responsive">
              <table className="tab" style={{width: "97%"}}>
                <thead className="tab">
                  <tr className="tab">
                    <th className="tab" style={{minWidth: "200px", font:"bold"}}> Détails des cours achetés </th>
                    <th className="tab" style={{width: "200px"}}>Prix initial</th>
                    <th className="tab" style={{width: "200px"}}>Prix aprés la réduction</th>
                    <th  style={{width: "100px"}}>Action</th>
                    <th  style={{width: "40px"}}><a href="#" className="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i className="ino ion-md-trash"></i></a></th>
                  </tr>
                </thead>
                <tbody  className="tab">
        
                {datacart?.map(item=>  {
                      total+=item?.discount_Price && item?.discount_Price!=0 ? parseFloat(item?.discount_Price) : parseFloat(item?.actual_Price)
                return <tr  className="tab">
                    <td  className="tab">
                      <div className="media align-items-center" style={{display: "flex"}}>
                        <img src={`http://localhost:8000/${item?.image}`} className="d-block ui-w-40 ui-bordered mr-4" alt=""/>
                        <div className="media-body" >
                          
                          <small>
                            <span className="text-muted font-bold">Titre: </span> {item?.titre}
                            <span className="ui-product-color ui-product-color-sm align-text-bottom" style={{background:"#bdbdbd" ,width:"10px",marginLeft:"5px" , height:"9px"}}></span> &nbsp;<br/>
                            
                            <span className="text-muted font-bold">Catégorie: </span> 
                            {item?.categorie}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="tab">{item?.actual_Price} Dt</td>
                    <td  className="tab" >{item?.discount_Price && item?.discount_Price!=0? item?.discount_Price : item?.actual_Price} DT</td>
                    <td > <Button variant="contained" startIcon={<DeleteIcon />} color="error" style={{marginLeft:"31px"}} onClick={()=>
                     {
                    dispatch( cartaction.deletetocart(item))
                     }}> Supprimer</Button></td>
                  </tr>})}
        
                </tbody>
              </table>
            </div>
        
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="d-flex">
                <div className="total">
                  <label className="text-muted font-weight-normal m-0">Montant total</label>
                  <div className="text-large"><strong>{total} Dt</strong></div>
                </div>
              </div>
            </div>
        
            <div  style={{display: "flex",columnGap: "33px",justifyContent: "end"}}>
            <Link to='/'><Button variant="contained">Retour aux achats</Button></Link>
          <Button variant="contained" color="success" onClick={() => handleCheckout()}>Payer commande</Button>
            </div>
        
          </div>
      </div></>)
}

export default Cart;