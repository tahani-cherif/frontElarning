/* eslint-disable no-lone-blocks */
import React, { useState,useEffect } from 'react';
import { Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useNavigate } from "react-router";
import { addVideo } from '../../redux/video';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import  {getALLcategory} from '../../redux/category'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
      },
    
    }
  }));
  const useStylesSelect = makeStyles((theme) => ({
    customSelect: {
        '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
          color: 'white',
        },
        '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input::placeholder': {
          color: 'white',
          opacity: 1, // In case you want to customize the placeholder color as well
        },
      },
      customFormControl: {
        color: 'white', // Change color for MuiFormControl text
      },
      
    
  }));

const UploadVideoPage = () => {
    const classes = useStyles();
    const classesselect = useStylesSelect();
    const { id } = useParams();
    const [video, setVideo] = useState(null)
    const {data} = useSelector(state=>state.category)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user=JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        dispatch(getALLcategory())
      },[])
    const handleFormSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('videoUrl', values.VideoUrl)
        formData.append('coatch',user?._id)
        formData.append('description', values.description)
        formData.append('titre', values.titre)
        formData.append('categorie', values.categorie)
        formData.append('ordre', values.ordre)
        formData.append('dure', values.dure)
        formData.append('course', id)
        dispatch(addVideo(formData)).then(secc => {
            if (secc?.type === "video/addVideo/fulfilled") {
                navigate("/formateur/listecourformateur")
            }
        }).catch(err => {
            console.log('test2', err)
        })
    }

    const initialValues = {
        VideoUrl: "",
        description: "",
        titre: "",
        categorie: "",
        ordre: 0,
        dure: ""
    };

    const checkoutSchema = yup.object().shape({
        VideoUrl: yup.mixed().required("Required"),
        description: yup.string().required("Required"),
        titre: yup.string().required("Required"),
        categorie: yup.string().required("Required"),
        ordre: yup.number().required("Required"),
        dure: yup.string().required("Required"),
    })
    {
        return ( 
            <div>
                <div className="card" style={{ width: "1100px",backgroundColor:"#144272" }}>
                    <div className="card-header" style={{display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px"}}>
                        <h2 style={{ fontSize: "2rem" }}>Ajouter un nouveau Vidéo</h2>
                    </div>
                    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
                        {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit, }) => (
                            <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between',padding: "29px", margin: "auto" }}>
                                        <div className="media align-items-center2 " style={{ display: "flex" ,gap:"45px"}}>
                                            <div>
                                            <div className="play-video" style={{
                                                width: "400px",
                                                height: "290px",
                                                border: "3px dashed silver",
                                                backgroundColor: "white",
                                                cursor: "pointer",
                                                marginTop: "40px",
                                                borderRadius: '10px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                {values.VideoUrl ? <video className="vidcour "
                                                    style={{}}
                                                    src={video == null ? values.VideoUrl ? "http://localhost:8000/" + values.VideoUrl : "./video.mp4" : URL.createObjectURL(video)} alt="" />
                                                    : <><input type="file" id="video-upload" accept="video/*"
                                                        style={{ display: "", }}
                                                        onChange={e => {
                                                            setFieldValue("VideoUrl", e.target.files[0])
                                                            setVideo(e.target.files[0])
                                                        }} />
                                                    </>}

                                            </div>
                                            <p style={{    marginTop: "29px",
                                           color: "darkgray"}}>*la video de ordre 1 c'est gratuit pour tout utilisateur</p>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div className="shadow-box ms-5 mt-6" style={{
                                                flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{    display: "flex",flexDirection: "column"}}>
                                                        <label for="Titre">Titre Vidéo</label>
                                                        <TextField type="video"   
                                                         className={classes.root}
                                                         sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                             color: "white"
                                                         },shrink:{color: "white"}}}    inputProps={{ style: { color: 'white'} }}
                                                           id="idTitre" placeholder="Donnez votre titre"
                                                            autoFocus
                                                            name='titre'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.titre}
                                                            error={!!touched.titre && !!errors.titre}
                                                            helperText={touched.titre && errors.titre} 
                                                            />

                                                    </div>
                                                    <div style={{    display: "flex",flexDirection: "column"}}>
                                                        <label for="ordre" style={{ marginLeft: '10px' }}>Ordre Vidéo</label>
                                                        <TextField type="video"  
                                                         className={classes.root}
                                                         sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                             color: "white"
                                                         },shrink:{color: "white"}}}    inputProps={{ style: { color: 'white'} }}
                                                        style={{ marginLeft: '10px' }} id="idordre" placeholder="Donnez l'ordre de vidéo"
                                                            name='ordre'
                                                            type='number'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.ordre}
                                                            error={!!touched.ordre && !!errors.ordre} 
                                                            helperText={touched.ordre && errors.ordre} />
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex',gap:"10px"}}>
                                                    <div style={{    display: "flex",flexDirection: "column"}}>
                                                        <label for="Nom">Duré du vidéo en min </label>
                                                        <TextField
                                                         className={classes.root}
                                                         sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                             color: "white"
                                                         },shrink:{color: "white"}}}    inputProps={{ style: { color: 'white'} }}
                                                        type="Nom"  style={{ width: '226px' }} id="idNom" placeholder="Donner une durée"
                                                            name='dure'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.dure}
                                                            error={!!touched.dure && !!errors.dure} 
                                                            helperText={touched.dure && errors.dure} />
                                                    </div>
                                                    <div>
                                                    <FormControl fullWidth className={classesselect.customFormControl}>
                                                    {/* <InputLabel id="demo-simple-select-label" style={{ color: 'white' }} >categorie</InputLabel> */}
                                                    <label>categorie</label>
                                                    <Select
                                                    className={classesselect.customSelect}
                                                    style={{ width: '220px' }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="categorie"
                                                    onBlur={handleBlur}
                                                    name="categorie"
                                                    onChange={handleChange}
                                                    value={values.categorie}
                                                    error={!!touched.categorie && !!errors.categorie}
                                                    helperText={touched.categorie && errors.categorie}
                                                    >
                                                        {
                                                            data?.map(item=>  <MenuItem value={item?.category}>{item?.category}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                                </div>
                                                    </div>
                                                   
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{    display: "flex",flexDirection: "column"}}>
                                                        <label for="bio">Description</label>
                                                        <TextField 
                                                        
                                                        className={classes.root}
                                                    sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                        color: "white"
                                                    },shrink:{color: "white"}}}    inputProps={{ style: { color: 'white'} }}
                                                        style={{ width: '450px' }}
                                                       multiline  rows={4} id="desc" rows="4" placeholder="Donnez votre description"
                                                            onBlur={handleBlur}
                                                            name='description'
                                                            onChange={handleChange}
                                                            value={values.description}
                                                            error={!!touched.description && !!errors.description} 
                                                            helperText={touched.description && errors.description}/>
                                                    </div>

                                                </div>

                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex column-gap-2 justify-content-end ml-5">
                                                    <div class="btn-group2" style={{ display: 'flex',justifyContent: "end",marginRight: "104px" }}>
                                                        <Button variant="contained" color="success" type="submit" style={{}}>Ajouter</Button>
                                                        <Button variant="contained" color="error" style={{ marginLeft: '10px' }} type="" onClick={() => { navigate(`/formateur/listecourformateur`) }}>Annuler l'ajout </Button>
                                                    </div>
                                                </div>
                            </form >
                        )}
                    </Formik >
                </div>
            </div>


        )


    }
};

export default UploadVideoPage;