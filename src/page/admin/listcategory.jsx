

import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme ,Button,Typography,Grid,TextField } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import  {getALLcategory,deletecategory,createcategory} from '../../redux/category'
import Swal from 'sweetalert2'
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      // input label when focused
      "& label.Mui-focused": {
        color: "white"
      },
      // focused color for input with variant='standard'
      "& .MuiInput-underline:after": {
        borderBottomColor: "white"
      },
      // focused color for input with variant='filled'
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: "white"
      },
      // focused color for input with variant='outlined'
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "white"
        }
      }
    }
  }));

const ListeCategory=()=>{
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor:"#144272",
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [categorie, setCategorie] = React.useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {data} = useSelector(state=>state.category)
    const {status} = useSelector(state=>state.category)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getALLcategory())
    },[])
    const columns = [
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ( params ) => 
    
    {     
         return      [
                <GridActionsCellItem
                  icon={<DeleteIcon color="error" />}
                  label="delete"
                  onClick={(event)=> {
                    console.log(params)
                  dispatch(deletecategory({id:params.row._id})).then(data => {
            
                    if (data.type === "category/deletecategory/fulfilled") {
                      Swal.fire(
                        'Succès',
                        `Categorie supprimer avec succe  `,
                        'success'
                      )
                      dispatch(getALLcategory())
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Quelque chose s'est mal passé!",
                      })
                    }
    
                  })

                  }}
    
                />,
              ]}
            
         
          
        },

        { field: "category", headerName: "Categorie", width: 200 },]

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
            Add Categorie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid item xs={12}>
                <TextField
                className={classes.root}
                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                    color: "white"
                },shrink:{color: "white"}}} 
                  fullWidth
                  id="categorie"
                  label="Nom Categorie "
                  name="categorie"
                  value={categorie}
                  onChange={(e)=>setCategorie(e.target.value)}
                />
              </Grid>
              <Button variant="outlined"style={{backgroundColor:"white",marginTop:"10px",width:"100%" }} startIcon={<AddIcon />} onClick={()=>{
       if(categorie)
      { dispatch(createcategory({
            category:categorie
        })).then(data => {
            
            if (data.type === "category/createcategory/fulfilled") {
                handleClose()
                setCategorie("")
              Swal.fire(
                'Succès',
                `Categorie Ajouter avec succe  `,
                'success'
              )
              dispatch(getALLcategory())
            } else {
                handleClose()
                setCategorie("")
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose s'est mal passé!",
              })
            }

          })
    
    }else{  handleClose()
        setCategorie("")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose s'est mal passé!",
              }) 
        }
          
          
          }}>Add</Button>
          </Typography>
        </Box>
      </Modal>
       {status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>:
    <Box> 
    <div className="card" style={{padding:"20px",width:"40%",backgroundColor:"#144272"}}>
        <div className="card-header" style={{display: "flex",justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{fontSize:"2rem"}}>Liste des categorie</h2>
            <Button variant="outlined"style={{backgroundColor:"white" }} startIcon={<AddIcon />} onClick={()=>{
          handleOpen()}}>Add</Button>
        </div>
       
            <Box
            m="8px 0 0 0"
            width="100%"
            height="80vh"
            >
            <DataGrid
            getRowId={(row) => row?._id}
            rows={data || []}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[8]}
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
            </div></Box> 
            }
            </Box>
                </>
            }

export default ListeCategory;