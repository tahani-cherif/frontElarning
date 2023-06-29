

import React, {  useState,useEffect } from "react";
import { Box} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
// import {getorder} from '../redux/order';
// import {getAllcourbyorder} from '../redux/coursSlice';
import { useDispatch,useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const ListecommandeAdmin=()=>{
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//   const {dataorder} = useSelector(state=>state.order)
//   const {status} = useSelector(state=>state.order)
//   const {error} = useSelector(state=>state.cour)
// const {statuscour} = useSelector(state=>state.cour)
// const {datauser} = useSelector(state=>state.cour)
  const dispatch = useDispatch();
  useEffect(()=>{
    // dispatch(getorder())
  },[])

    const columns = [
        { field: "nomclient", headerName: "Nom Client",valueGetter: rowData =>{
          return rowData.row.user?.name+" "+rowData.row.user?.astname }, width: 200 },
        { field: "orderDate", headerName: "Dtae de Commande",valueGetter: rowData =>{
          return moment(rowData.row.orderDate).format('LLL')
        }, width: 300 },
       { field: "nomcour", headerName: "Nombre de cour achte",valueGetter: rowData =>{
        return rowData.row.Cours.length
      }, width: 200 },
        { field: "montant", headerName: "Montant", width: 150 },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Détail',
          width: 100,
          cellClassName: 'actions',
          getActions: ( params ) => 
    
    {     // console.log( "11111111111",params)  
         return      [<Button variant="contained" onClick={()=>{
        //   dispatch(getAllcourbyorder(params.row.Cours))
          handleOpen()}}>Détail</Button>]}},
      ];
    return <>
       <Box m="20px">
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Liste Cour Achte
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
        {/* {statuscour ==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress /> </div>: datauser?.courses?.map(item=>
         { return <div style={{padding: "29px",backgroundColor: "#F8F8F9",margin: "38PX 39PX 11px"}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className="media align-items-center" style={{display: "flex"}}>
                        <img src={`http://localhost:8000/${item?.image}`} className="d-block ui-w-40 ui-bordered mr-4" alt=""/>
                        <div className="media-body" >
                          <p>{item?.titre}</p>
                          <small>
                            <span className="text-muted">Titre: {item?.titre}</span>
                            <span className="ui-product-color ui-product-color-sm align-text-bottom" style={{background:"#bdbdbd" ,width:"10px",marginLeft:"5px" , height:"9px"}}></span> &nbsp;
                            <span className="text-muted">Ce que vous apprendrez  </span> {item?.what_You_Will_Learn} &nbsp;
                            <span className="text-muted">Catégorie</span> {item?.categorie}
                          </small>
                        </div>
                        </div>
                      </div>
         
           </div>  })} */}
          </Typography>
        </Box>
      </Modal>
    <Box> 
    <div className="card" style={{padding:"20px",width:"76%",backgroundColor:"#144272"}}>
        <div className="card-header" style={{display: "flex",justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px"}}>
            <h2 style={{fontSize:"2rem"}}>Liste des commandes </h2>
        </div>
{/*          
        {status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress /> </div>: */}
            <Box
            m="8px 0 0 0"
            width="100%"
            height="80vh"
            >
            <DataGrid
            //  getRowId={(row) => row?._id}
            rows={[]}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 5,
                },
                },
            }}
            pageSizeOptions={[5]}
            sx={{
                boxShadow: 2,
                border: 2,
                borderColor: '#205295',
                color:"#BAD7E9",
                '& .MuiDataGrid-toolbarContainer': {
                    '& .MuiButton-text': {
                     color: 'white',
                     },
                   },
                   '.MuiTablePagination-toolbar': {
                    color: 'white',

                  },
                  "& .MuiPaginationItem-root": {
                    color: "#fff"
                  }
              }}
            />
            </Box>
            {/* } */}
            </div></Box> 
            
            </Box>
                </>
            }

export default ListecommandeAdmin;