import {
    Box,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
  } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { makeStyles } from '@material-ui/core';
import { LoadingButton } from "@mui/lab";
import {sendemailcontact} from "../redux/user"
import { useDispatch,useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

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
const Contact=()=>{
    const classes = useStyles();
    emailjs.init("QYXhiPZYdEwMF_Mgo");
    const dispatch = useDispatch();
    const contactSchema = Yup.object().shape({
        email: Yup.string()
          .email("Provide a valid email address")
          .required("Email is required"),
        desc: Yup.string().required("description is required"),
        object: Yup.string().required("description is required"),
      });
      const  initialValues= {
        email: "",
        desc: "",
        object: "",
      }
      const handleFormSubmit = async(x,{resetForm}) => {
     console.log(x)
     dispatch(sendemailcontact(x)).then(secc =>{ 
        Swal.fire(
        'Success',
        `Votre email envoyer avec succes`,
        'success'
      )
      resetForm({ email: "",
      desc: "",
      object: "",})
    })
    
    // emailjs.sendForm('service_suxqz56','template_049gwlj', x)
    // .then((result) => {

    //      Swal.fire(
    //     'Success',
    //     `Votre email envoyer avec succes`,
    //     'success'
    //      )
    //      console.log(result);
    // }, (error) => {
    // console.log(error);
    // });
      }
    return(<div className="m-auto">
       
         <div className="bg-[#144272] p-10 m-10">
         <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={contactSchema}>
    {({ values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit,}) => (
      <form onSubmit={handleSubmit}>
          <h2 className="text-[30px] flex justify-center items-center mb-6">contactez nous</h2>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              className={classes.root}
              fullWidth
              autoComplete="username"
              type="email"
              label="Email Address"
              onChange={(e)=>{
                setFieldValue("email", e.target.value);}}
              name="email"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                color: "white"
            },shrink:{color: "white"}}} 
            />
             <TextField
              className={classes.root}
              fullWidth
              autoComplete="username"
              type="text"
              label="object"
              onChange={(e)=>{
                setFieldValue("object", e.target.value);}}
              name="object"
              value={values.object}
              error={Boolean(touched.object && errors.object)}
              helperText={touched.object && errors.object}
              sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                color: "white"
            },shrink:{color: "white"}}} 
            />
             <TextField
               className={classes.root}
               sx={{ input: { color: "white" }, label: {color: "white"}, floatingLabelFocusStyle: {
                   color: "white"
               },shrink:{color: "white"}}}    inputProps={{ style: { color: 'white'} }}
              fullWidth
              autoComplete="username"
              type="text"
              label="Description"
              onChange={(e)=>{
                setFieldValue("desc", e.target.value);}}
              name="desc"
              value={values.desc}
              error={Boolean(touched.desc && errors.desc)}
              helperText={touched.desc && errors.desc}
            multiline
            rows={7}
            />

          
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
            style={{marginTop:"10px"}}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{backgroundColor:"#2C74B3",color:"white"}}
            >
              Envoyer
            </LoadingButton>
          </Box>
        </Box>
      </form>
      )}
      </Formik>
          
         </div>

    </div>)
}

export default Contact;