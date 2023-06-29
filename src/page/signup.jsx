import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from "formik";
import * as yup from 'yup';
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch,useSelector } from 'react-redux';
import {signup} from '../redux/user'
import { Alert } from "@mui/material";
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
 
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}
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
const theme = createTheme();

export default function SignUp() {
  const classes = useStyles();
  const [etat,setEtat]=React.useState({})
  const {error} = useSelector(state=>state.user)
  const {statussignup} = useSelector(state=>state.user)
  const {data} = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = (values,{resetForm}) => {
    console.log("submite",values)
    const formData = new FormData();
    formData.append('image',values.picture)
    formData.append('first_name',values.name)
    formData.append('last_name',values.lastName)
    formData.append('fullName',values.name+" "+values.lastName)
    formData.append('age',values.age)
    formData.append('phoneNumber',values.phoneNumber)
    formData.append('email',values.email)
    formData.append('password',values.password)
    formData.append('role',"user")

    dispatch(signup(formData)).then(secc=>{
      console.log('test',secc)
      setEtat(secc)
      if(secc.type==="user/signup /fulfilled")
     { navigate("/login")}
    }).catch(err=>{
        console.log('test2',err)})
  }
  const initialValues = {
    picture:"",
    name: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
    password:"",
    role:""
  };
  const phonetunis=/^[+0]{0,2}(91)?[0-9]{8}$/;
  const checkoutSchema = yup.object().shape({
    name:yup.string().required("Required"),
    lastName:yup.string().required("Required"),
    age:yup.number().required("Required"),
    phoneNumber:yup.string().matches(phonetunis, 'Veuillez saisir un numéro valide').required("Required"),
    email:yup.string().email().required("Required"),
    password:yup.string().min(8,'Le mot de passe doit dépasser 8 charactéres').required("Required"),
  })
  return (
    <ThemeProvider theme={theme} style={{backgroundColor:"#144272",padding:"20px",color:"white"}}>
      <Container component="main" maxWidth="xs" style={{backgroundColor:"#144272"}}>
        <CssBaseline />
        <Box
          sx={{
            // backgroundColor:"#144272",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color:"white",
            padding:"20px"
          }}

        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          S'inscrire
          </Typography>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({ values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit,}) => (
        <form onSubmit={handleSubmit}>
          <Box  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.root}
                    sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                        color: "white"
                    },shrink:{color: "white"}}} 
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="firstName"
                  label="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.root}
                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                    color: "white"
                },shrink:{color: "white"}}} 
                  fullWidth
                  id="lastName"
                  label="Prénom"
                  name="lastName"
                  autoComplete="family-name"
                  
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.root}
                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                    color: "white"
                },shrink:{color: "white"}}} 
                  autoComplete="given-name"
                  name="age"
                  fullWidth
                  id="age"
                  label="Age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  error={!!touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.root}
                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                    color: "white"
                },shrink:{color: "white"}}} 
                  fullWidth
                  id="phoneNumber"
                  label="Numéro de téléphone"
                  name="phoneNumber"
                  autoComplete="family-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                className={classes.root}
                   sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                    color: "white"
                },shrink:{color: "white"}}} 
                  fullWidth
                  id="email"
                  label="Addresse Email "
                  name="email"
                  autoComplete="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                       <TextField
                       className={classes.root}
                          sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                            color: "white"
                        },shrink:{color: "white"}}} 
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Box  sx={{ gridColumn: "span 4" , display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center' ,    margin:'auto',
    marginTop: '34px',
    marginBottom: '13px'}}>
             <input
              style={{display: "none" }}
              onBlur={handleBlur}
              onChange={e=>setFieldValue("picture",e.target.files[0])}
              name="picture"
              accept="image/*"
              id="contained-button-file"
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" >
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            </Box>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"#2C74B3",color:"white"}}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to='/login' variant="body2"  style={{color:"#BAD7E9"}}>
              Vous avez déjà un compte? Se connecter
                  </Link>
              </Grid>
            </Grid>
          </Box>
          </form>
      )}
    </Formik>
    {statussignup==="failed" || data.success===false ?  <Alert severity="error" style={{marginTop:"10px"}}>Il y a un probleme verifier les donées saisies</Alert> :null}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}