import React, { useState ,useEffect} from 'react';
import { Formik } from "formik";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Fab from '@mui/material/Fab';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { createcour } from '../../redux/cour'
import * as yup from 'yup';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import  {getALLcategory} from '../../redux/category'

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

const UploadCours = () => {
    const classes = useStyles();
    const classesselect = useStylesSelect();
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(getALLcategory())
      },[])
    const user=JSON.parse(localStorage.getItem('user'));
    const [selectedOption, setSelectedOption] = useState('');
    const [pageVisible, setPageVisible] = useState(true);
    const {data} = useSelector(state=>state.category)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch();
    const handleFormSubmit = async (values, { resetForm }) => {
        console.log("submitecour", values)
        const formData = new FormData();
        formData.append('image', values.image)
        formData.append('description', values.description)
        formData.append('createur', user?._id)
        formData.append('titre', values.titre)
        formData.append('categorie', values.categorie)
        formData.append('ce_que_vous_apprenez', values.ce_que_vous_apprenez)
        formData.append('actual_Price', values.actual_Price)
        formData.append('discount_Price', values.discount_Price)
        formData.append('bioFormateur', values.bioFormateur)
        formData.append('langue', values.langue)
        dispatch(createcour(formData)).then(secc => {
            if (secc?.type === "cour/createcour/fulfilled") {
                navigate("/formateur/listecourformateur")
            }
        }).catch(err => {
            console.log('err', err)
        })

    };
    const checkoutSchema = yup.object().shape({
        image: yup.mixed().required("Required"),
        titre: yup.string().required("Required"),
        langue: yup.string().required("Required"),
        bioFormateur: yup.string().required("Required"),
        description: yup.string().required("Required"),
        categorie: yup.string().required("Required"),
        ce_que_vous_apprenez: yup.string().required("Required"),
        actual_Price: yup.number().required("Required"),
        discount_Price: yup.number().required("Required"),
    })
    const initialValues = {
        image: "",
        titre: "",
        langue: "",
        bioFormateur: "",
        description: "",
        categorie: "",
        actual_Price: "",
        discount_Price: "",
        ce_que_vous_apprenez: ""
    };

  
    return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit, }) => {
            console.log(values)
            return (
                <form onSubmit={handleSubmit}>
                    {pageVisible && (
                        <div style={{ overflowX: "hidden"}}>
                            <div className="card" style={{ padding: "20px", width: "90%",backgroundColor:"#144272",marginBottom:"20px" }} >
                                <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px" }}>
                                    <h2 style={{ fontSize: "2rem" }}>Ajouter un nouveau Cours</h2></div>
                                <div style={{ padding: "29px", margin: "13PX 39PX 11px" }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="media align-items-center " style={{ display: "flex" }}>

                                            <div className="play-video" style={{
                                                width: "400px",  
                                                height: "370px",
                                                border: "3px dashed silver",
                                                backgroundColor: "white",
                                                cursor: "pointer",
                                                marginTop: "40px",
                                                borderRadius: '10px',
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex"
                                            }}>
                                                {values.image  ?<div className='flex flex-col items-center'>

                                                    <img className="imgcour "
                                                    style={{}}
                                                    src={image == null ? values.image ? "http://localhost:8000/" + values.image : "./images.png" : URL.createObjectURL(image)} alt="" />
                                                    <><input type="file"
                                                    accept="image/*"
                                                    style={{ display: "none", }}
                                                    id="button-file"
                                                    onChange={e => {
                                                        setFieldValue("image", e.target.files[0])
                                                        setImage(e.target.files[0])
                                                    }} />

                                                <label htmlFor="button-file">
                                                    <Fab component="span" >
                                                        <AddPhotoAlternateIcon />
                                                    </Fab>
                                                </label></>
                                                    </div>
                                              : <><input type="file"
                                                    accept="image/*"
                                                    style={{ display: "none", }}
                                                    id="button-file"
                                                    onChange={e => {
                                                        setFieldValue("image", e.target.files[0])
                                                        setImage(e.target.files[0])
                                                    }} />

                                                <label htmlFor="button-file">
                                                    <Fab component="span" >
                                                        <AddPhotoAlternateIcon />
                                                    </Fab>
                                                </label></> }
                                            </div>

                                            <div className="shadow-box ms-7 mt-12">
                                                <div className="form-group mb-3">
                                                    <label for="Titre">Titre Cours</label>
                                                    <TextField   className={classes.root}
                                                            sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                                color: "white"
                                                            },shrink:{color: "white"}}}  
                                                            style={{ width: '400px' }}
                                                        name="titre"
                                                        id="idTitre"
                                                        autoFocus
                                                        placeholder="Entrez votre titre"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.titre}
                                                        error={!!touched.titre && !!errors.titre}
                                                        helperText={touched.titre && errors.titre} 

                                                    />

                                                </div>
                                                <FormControl fullWidth className={classesselect.customFormControl}>
                                                    <InputLabel id="demo-simple-select-label" style={{ color: 'white' }} >categorie</InputLabel>
                                                    <Select
                                                    className={classesselect.customSelect}
                                                    style={{ width: '400px' }}
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
                                        
                                                    <div className="form-group mb-3">
                                                    <label for="description">Description cours</label>
                                                    <TextField
                                                    className={classes.root}
                                                    sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                        color: "white"
                                                    },shrink:{color: "white"}}}  
                                                        style={{ width: '400px', marginTop: '3px' }}
                                                        id="desc" multiline  rows={4}
                                                        name="description"
                                                        inputProps={{ style: { color: 'white'} }}
                                                        placeholder="Entrez votre description"
                                                        autoComplete="new-text"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.description}
                                                        error={!!touched.description && !!errors.description}
                                                        helperText={touched.description && errors.description} />
                                            </div>
                                            <div className="form-group mb-3">
                                            <FormControl  fullWidth className={classesselect.customFormControl}>
                                                    <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>langue de cour</InputLabel>
                                                    <Select
                                                     style={{ width: '400px' }}
                                                    className={classesselect.customSelect}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="langue de cour"
                                                    name="langue"
                                                    value={values.langue}
                                                    SelectDisplayProps={{ style: { color:"white"} }}
                                                    onChange={handleChange}
                                                    error={!!touched.langue && !!errors.langue}
                                                        helperText={touched.langue && errors.langue} >
                                                        
                                                        
                                                        <MenuItem value="Français">Français</MenuItem>
                                                        <MenuItem value="Anglais">Anglais</MenuItem>
                                                    
                                                    </Select>
                                                    </FormControl>
                                                   
                                            </div>

                                                <label for="montant">Montant</label>
                                                <div>
                                                        <div style={{ display: 'flex' ,alignItems: 'center' }}>
                                                             
                                                            <TextField type="text" 
                                                             className={classes.root}
                                                             sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                                 color: "white"
                                                             },shrink:{color: "white"}}}  
                                                                style={{ width: '190px' }} id="idTitre"
                                                                aria-describedby="emailHelp"
                                                                name='actual_Price'
                                                                // eslint-disable-next-line react/jsx-no-duplicate-props
                                                                type="number"
                                                                placeholder="Entrez votre prix"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.actual_Price}
                                                                error={!!touched.actual_Price && !!errors.actual_Price}
                                                                helperText={touched.actual_Price && errors.actual_Price} />

                                                            <TextField type="text"
                                                             className={classes.root}
                                                             sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                                 color: "white"
                                                             },shrink:{color: "white"}}}  
                                                                style={{ width: '200px', marginLeft: '10px' }} id="discountprix"
                                                                aria-describedby="emailHelp"
                                                                name="discount_Price"
                                                                type="number"
                                                                placeholder="Entrez le prix discounté"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.discount_Price}
                                                                error={!!touched.discount_Price && !!errors.discount_Price}
                                                                helperText={touched.discount_Price && errors.discount_Price}
                                                            />
                                                        </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='shadow-box ms-5 mt-12'>
                                            <div className="form-group mb-3">
                                                <label for="connaissance">Ce que vous-aves apprenez</label>
                                                <TextField 
                                                className={classes.root}
                                                sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                    color: "white"
                                                },shrink:{color: "white"}}}   
                                                style={{ width: '400px', marginTop: '3px' }}
                                                inputProps={{ style: { color: 'white'} }}
                                                    id="desc" multiline  rows={5} placeholder="entrez ici les pré-connaissance de l'étudiant"
                                                    autoComplete="new-text"
                                                    onBlur={handleBlur}
                                                    name='ce_que_vous_apprenez'
                                                    onChange={handleChange}
                                                    value={values.ce_que_vous_apprenez}
                                                    error={!!touched.ce_que_vous_apprenez && !!errors.ce_que_vous_apprenez}
                                                    helperText={touched.ce_que_vous_apprenez && errors.ce_que_vous_apprenez} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label for="bio">Bio for coach</label>
                                                <TextField 
                                                className={classes.root}
                                                sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                                    color: "white"
                                                },shrink:{color: "white"}}}  
                                                    style={{ width: '400px', marginTop: '3px' }}
                                                    inputProps={{ style: { color: 'white'} }}
                                                    id="desc" 
                                                    multiline 
                                                    rows={4} placeholder="Entrez votre Bio"
                                                    autoComplete="new-text"
                                                    name='bioFormateur'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bioFormateur}
                                                    error={!!touched.bioFormateur && !!errors.bioFormateur}
                                                    helperText={touched.bioFormateur && errors.bioFormateur} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex column-gap-2 justify-content-end ml-5">
                                        <div class="btn-group">
                                            <Button variant="contained" color="success" className=""
                                                style={{ margin: "0PX 1140PX " }} type='submit'>Ajouter</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </form>
            )
        }}
    </Formik >


}
export default UploadCours;