import './editprofile.css'
import Button from '@mui/material/Button';
import { Formik } from "formik";
import * as yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import  {updateuser} from '../redux/user'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
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
const Editprofile=()=>{
    const classes = useStyles();
    const [image,setImage]=useState(null)
    const user=JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const initialValues = user.role !="user" ?{
        picture:user?.image,
        name: user?.first_name,
        lastName:user?.last_name,
        age: user?.age,
        phoneNumber:user?.phoneNumber,
        email: user?.email,
        iban:user?.iban,
        bic:user.bic
      }:
      {
        picture:user?.image,
        name: user?.first_name,
        lastName:user?.last_name,
        age: user?.age,
        phoneNumber:user?.phoneNumber,
        email: user?.email,
      }
      const phonetunis=/^[+0]{0,2}(91)?[0-9]{8}$/;
      const checkoutSchema =user?.role !="user" ? yup.object().shape({
        picture:yup.mixed().required("Required"),
        name:yup.string().required("Required"),
        lastName:yup.string().required("Required"),
        age:yup.number().required("Required"),
        phoneNumber:yup.string().matches(phonetunis, 'Veuillez saisir un numéro valide').required("Required"),
        email:yup.string().email().required("Required"),
        bic:yup.string().required("Required"),
        iban:yup.string().required("Required"),
      }):
      yup.object().shape({
        picture:yup.mixed().required("Required"),
        name:yup.string().required("Required"),
        lastName:yup.string().required("Required"),
        age:yup.number().required("Required"),
        phoneNumber:yup.string().matches(phonetunis, 'Veuillez saisir un numéro valide').required("Required"),
        email:yup.string().email().required("Required"),
      })
      const  handleFormSubmit=(values)=>{
        const formData = new FormData();
        formData.append('image',values.picture)
        formData.append('first_name',values.name)
        formData.append('last_name',values.lastName)
        formData.append('fullName',values.name+" "+values.lastName)
        formData.append('age',values.age)
        formData.append('phoneNumber',values.phoneNumber)
        formData.append('email',values.email)
        formData.append('_id',user._id)
        if(user.role!="user"){
            formData.append('iban',values.iban)
            formData.append('bic',values.bic)
        }
        dispatch(updateuser({_id:user._id,data:formData})).then(data=>{
          if(data.type==="user/updateuser/fulfilled" ){
            localStorage.setItem('user', JSON.stringify(data?.payload));
            Swal.fire(
                      'Success',
                      `${values.name} a été modifier avec succés`,
                      'success'
                    ) 
              window.location.reload();
           }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Quelque chose c'est mal passé!",
                  })}
        }).catch(err=>{
            console.log('test2',err)})
      }
    return <div className="container-xl px-4 mt-4" style={{marginBottom:"20px"}}>

    <Formik  enableReinitialize={true} onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({ values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit,}) =>{
        console.log(values.picture)
        return(
        <form onSubmit={handleSubmit}>
        <div className="row">
        <div className="col-xl-42">
            <div className="card mb-4 mb-xl-0" style={{backgroundColor: "#144272",}}>
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px",marginBottom:"10px" }}>Image de profil</div>
                <div className="card-body text-center">
                    <img className="img-account-profile rounded-circle mb-2" src={ image==null ?values.picture ? "http://localhost:8000/"+values.picture:"./images.png" :URL.createObjectURL(image)}alt="" />
                    <Box  sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center' ,    margin:'auto',
                      marginTop: '34px',
                      marginBottom: '13px'}}>
                     <input
                        style={{display: "none" }}
                        onBlur={handleBlur}
                        onChange={e=>{setFieldValue("picture",e.target.files[0])
                        setImage(e.target.files[0])}}
                        name="picture"
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                      />
                      <label htmlFor="contained-button-file">
                        <div variant="contained" component="span" style={{
                          marginTop: "20px",
                          backgroundColor: "#1565C0",
                          color: "white",
                          width: "314px",
                          padding: "7px",
                          borderRadius: "5px", margin:"auto",
                          cursor: "url(hand.cur), pointer"}}>Télécharger une nouvelle image</div>
                      </label>
                      </Box>
                </div>
            </div>
        </div>
        <div className="col-xl-82">
            <div className="card mb-4" style={{backgroundColor: "#144272",}}>
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#205295",padding:"20px",borderRadius:"15px 15px 0px 0px",marginBottom:"10px" }}>Détails du compte</div>
                <div className="card-body">
                        <div className="row gx-3 mb-3">
                            <div className="col-md-62">
                                <label className="small mb-1" for="TextFieldFirstName">Nom</label>
                                <TextField 
                                   className={classes.root}
                                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                       color: "white"
                                   },shrink:{color: "white"}}} 
                                 id="TextFieldFirstName" type="text" placeholder="Entrez votre nom" 
                                 name="name"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 error={!!touched.name && !!errors.name}
                                 helperText={touched.name && errors.name} 
                                 value={values.name} 
                                  />
                            </div>
                            <div className="col-md-62">
                                <label className="small mb-1" for="TextFieldLastName">Prénom</label>
                                <TextField 
                                  className={classes.root}
                                  sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                      color: "white"
                                  },shrink:{color: "white"}}} 
                                id="TextFieldLastName" type="text" placeholder="Entrez votre prénom" 
                                 name="lastName"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.lastName}
                                 error={!!touched.lastName && !!errors.lastName}
                                 helperText={touched.lastName && errors.lastName}  />
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-62">
                                <label className="small mb-1" for="TextFieldOrgName">Age</label>
                                <TextField
                                   className={classes.root}
                                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                       color: "white"
                                   },shrink:{color: "white"}}} 
                                 id="TextFieldOrgName" type="text" placeholder="Entrez votre age" 
                                  name="age"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.age}
                                  error={!!touched.age && !!errors.age}
                                  helperText={touched.age && errors.age} />
                            </div>
                            <div className="col-md-62">
                                <label className="small mb-1" for="TextFieldLocation">Numéro de téléphone</label>
                                <TextField
                                   className={classes.root}
                                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                       color: "white"
                                   },shrink:{color: "white"}}} 
                                 id="TextFieldLocation" type="tel" placeholder="Entrez votre numéro de téléphone"  
                                   name="phoneNumber"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="small mb-1" for="TextFieldEmailAddress">Adress email</label><br/>
                            <TextField
                            style={{width: '100%'}}
                            className={classes.root}
                            sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                color: "white"
                            },shrink:{color: "white"}}} 
                             id="TextFieldEmailAddress" type="email" placeholder="Entrez votre adress email" 
                             name="email"
                             onBlur={handleBlur}
                             onChange={handleChange}
                             value={values.email}
                             error={!!touched.email && !!errors.email}
                             helperText={touched.email && errors.email} />
                        </div>
                     { user?.role!="user" ?  <><div className="mb-3">
                                <label className="small mb-1" for="TextFieldPhone">Iban</label><br/>
                                <TextField 
                                style={{width: '100%'}}
                                className={classes.root}
                                sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                    color: "white"
                                },shrink:{color: "white"}}} 
                                id="TextFieldPhone" type="text" placeholder="Entrez votre iban" 
                                name="iban"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.iban}
                                error={!!touched.iban && !!errors.iban}
                                helperText={touched.iban && errors.iban} />
                        </div>
                        <div className="mb-3">
                                <label className="small mb-1" for="TextFieldPhone">Bic</label><br/>
                                <TextField 
                                style={{width: '100%'}}
                                className={classes.root}
                                sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                                    color: "white"
                                },shrink:{color: "white"}}} 
                                id="TextFieldPhone" type="text" placeholder="Entrez votre Bic" 
                                name="bic"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bic}
                                error={!!touched.bic && !!errors.bic}
                                helperText={touched.bic && errors.bic} />
                        </div></>:null}
                        <Button type="submit" variant="contained" style={{marginTop:"20px",margin:"auto"}}>Sauvegarder les modifications</Button>
                </div>
            </div>
        </div>
        </div>
        </form>
      )}}
    </Formik>    
</div>
}

export default Editprofile;