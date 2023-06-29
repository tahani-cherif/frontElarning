

import React, {  useState,useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme ,Typography} from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import  {getALLcour} from '../../redux/cour'

const ListeCourAdmin=()=>{
    const {data} = useSelector(state=>state.cour)
    const {status} = useSelector(state=>state.cour)
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getALLcour())
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
                  icon={<OndemandVideoIcon style={{'color': '#17B794'}} />}
                  label="All video"
                  onClick={(event)=> {
                    navigate(`/admin/listecourvideoadmin/${params.row._id}`)
                  }}
    
                />,
              ]}
            
         
          
        },
        { field: "dullName", headerName: "Nom de formateur",valueGetter: rowData =>{
          console.log(rowData)
          return rowData?.row?.createur?.fullName
        },width: 300 },
        { field: "categorie", headerName: "Categorie", width: 200 },
        { field: "actual_Price", headerName: "Prix initiale", width: 80 },
        { field: "discount_Price", headerName: "Prix discount" , width: 100 },
        { field: "isDeleted", headerName: "Etat du cours", width: 200, valueGetter: rowData =>{
          return rowData.row?.isDeleted ? "N'est pas disponnible": "Disponnible"},}
      ];
    return <>
       <Box m="20px">
       {status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>:
    <Box> 
    <div className="card" style={{padding:"20px",width:"76%",backgroundColor:"#144272"}}>
        <div className="card-header" style={{display: "flex",justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{fontSize:"2rem"}}>Liste des cours</h2>
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

export default ListeCourAdmin;