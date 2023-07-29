

import React, {  useEffect } from "react";
import { Box, CircularProgress, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate ,Link} from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { getALLcourformateur, deletecour ,updatecour} from '../../redux/cour';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CheckIcon from '@mui/icons-material/Check';

const ListeCourFormateur = () => {
  const user=JSON.parse(localStorage.getItem('user'));
  const { dataformateur } = useSelector(state => state.cour)
  const { status } = useSelector(state => state.cour)
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getALLcourformateur(user?._id))
  }, [])
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <Link to={"/formateur/updatecours/"+params.row._id}><GridActionsCellItem
            icon={<EditIcon style={{'color': '#2C74B3'}} />}
            label="Edit"
            onClick={() => { }}
          /></Link>,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="error"
            onClick={(event) => {
              dispatch(deletecour(params.row._id)).then(secc =>{ Swal.fire(
                'Success',
                `Delete votre cour avec succes`,
                'success'
              )
              dispatch(getALLcourformateur(user?._id))})
            }}
          />,
          <GridActionsCellItem
            icon={<OndemandVideoIcon style={{'color': '#17B794'}}/>}
            label="All video"
            color="success"
            onClick={(event) => {
              localStorage.setItem('nomcour',params.row.titre)
              navigate(`/formateur/listevideobycour/${params.row._id}`)
            }}

          />,
        ]
      }



    },
    { field: "titre", headerName: "Titre du cours", width: 200 },
    { field: "categorie", headerName: "Catégorie", width: 200 },
    { field: "actual_Price", headerName: "Prix initial", width: 80 },
    { field: "discount_Price", headerName: "Prix discount", width: 120 },

    {
      field: "isDeleted", headerName: "Etat du cours ?", width: 200, valueGetter: rowData => {
        return rowData.row?.isDeleted ? "Cours n'est pas disponnible" : "Cours disponnible"
      },
    },
    { field: "nb_user", headerName: "Nombre des commandes", width: 180 },
    {
      field: 'Courfini',
      type: 'actions',
      headerName: 'Création du cours terminée ou non ?',
      width: 300,
      cellClassName: 'actions',
      getActions: (params) => [
        !params.row?.isfinish ?<Button variant="outlined" style={{'color': 'white'}}  startIcon={<CheckIcon style={{'color': 'white'}} />} onClick={() => { 
           if(params.row?.isDeleted)
           {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Cette cours n'est pas disponnible!",
          })

           }else{
          dispatch(updatecour({id:params.row?._id,data:{isfinish:true}})).then((secc) => {
            if(secc.type==="cour/updatecour/fulfilled" ){

              Swal.fire(
                        'Success',
                        `La création du cours est terminé et il est apparut dans la plateforme`,
                        'success'
                      ) 
                      dispatch(getALLcourformateur(user?._id))

             }else{
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: "Quelque chose s'est mal passé!",
                    })}

          })
    }
         }}>
          Création terminée 
        </Button>:<p>Création du cours terminée</p>,
      ]
    },
    {
      field: 'Affecter PDF',
      type: 'actions',
      headerName: ' Affecter un fichier PDF',
      width: 200,
      cellClassName: 'actions',
      getActions: (params) => [
        <Button variant="outlined" style={{'color': 'white'}}  startIcon={<PictureAsPdfIcon style={{'color': 'white'}}/>} onClick={() => { navigate(`/formateur/uploadpdf/${params.row._id}`) }}>
          ADD PDF
        </Button>,
      ]
    },
    {
      field: 'AFFECTERvideo',
      type: 'actions',
      headerName: 'Affecter une Vidéo',
      width: 200,
      cellClassName: 'actions',
      getActions: (params) =>
        [
          <Button variant="outlined" style={{'color': 'white'}}  startIcon={<OndemandVideoIcon style={{'color': 'white'}} />} onClick={() => { navigate(`/formateur/uploadvideo/${params.row._id}`) }}>
            ADD Video
          </Button>,
        ]
    },
  ];
  return <>
    <Box m="20px" >
    {status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>:<Box>
        <div  className="card" style={{ padding: "20px", width: "80%",backgroundColor:"#144272",marginBottom:"20px" }} >
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
            <h2 style={{ fontSize: "2rem" }}>Liste des cours</h2>
           <Link to="/formateur/creationcour"><Button variant="outlined" style={{'color': 'white'}} startIcon={<AddIcon style={{'color': 'white'}} />}>Ajouter un nouveau cours</Button></Link> 
          </div>
         
          <Box
            m="8px 0 0 0"
            width="100%"
            height="80vh"
           
          >
            <DataGrid 
              getRowId={(row) => row?._id}
              rows={(dataformateur?.slice()?.sort(function(a, b) {
                return new Date(b?.createdAt)-new Date( a?.createdAt);
              })) || []}
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
        </div></Box>}

    </Box>
  </>
}

export default ListeCourFormateur;