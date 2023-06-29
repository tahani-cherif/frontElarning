
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Alert, CircularProgress, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { gettAllUser,updateuser } from '../../redux/user'
import Swal from 'sweetalert2'

const Listeuser = () => {
  const { alldata } = useSelector(state => state.user)
  const { status } = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettAllUser())
  }, [])


  const columns = [

    { field: "fullName", headerName: "Nom d'utilisateur", width: 200 },
    { field: "age", headerName: "Age", width: 150 },
    { field: "email", headerName: "Adresse E-mail", width: 300 },
    {
      field: "phoneNumber",
      headerName: "Numéro de téléphone",
      width: 150,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      width: 300,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          params.row.role === "formateur" ? <p>Formateur</p> : <Button variant="contained" color="success"
            onClick={() => {
              dispatch(updateuser({_id:params.row._id,role:"formateur"})).then(data => {
            
                if (data.type === "user/updateuser/fulfilled") {
                  Swal.fire(
                    'Succès',
                    `L'utilisateur devient foramteur `,
                    'success'
                  )
                  dispatch(gettAllUser())
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Quelque chose s'est mal passé!",
                  })
                }

              })
            }}
          >Marquer comme formateur</Button>,
        ]
      }

    },
  ];
  return <>
    <Box m="20px">
        {
            status==='loading' ? <div style={{display: "flex",
            justifyContent: "center",
            marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>
            :
       
      <Box>
        <div className="card" style={{ padding: "20px", width: "80%",backgroundColor:"#144272" }}>
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{ fontSize: "2rem" }}>Liste des utilisateurs</h2>
          </div>
          <Box
            m="8px 0 0 0"
            width="100%"
            height="80vh"
          >
            <DataGrid
              getRowId={(row) => row?._id}
              rows={alldata?.slice()?.sort(function (a, b) {
                return new Date(b?.createdAt) - new Date(a?.createdAt);
              }) .filter(x=>x._id!=localStorage.getItem("userid"))|| []}
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
        </div></Box> }

    </Box>
  </>
}

export default Listeuser;