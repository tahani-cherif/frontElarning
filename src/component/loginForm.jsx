import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch,useSelector } from 'react-redux';
import {login,passwordrecovery} from '../redux/user'
import { Formik } from "formik";
import { RecoveryContext } from "../../src/App";
import { useContext } from "react"

import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { makeStyles } from '@material-ui/core';
import api from "../config-axios"

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
const LoginForm = () => {
  const classes = useStyles();
  const {data} = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { user,setUser } = useContext(RecoveryContext);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const  initialValues= {
    email: "",
    password: "",
  }

    const handleFormSubmit = async(x,{resetForm}) => {
      dispatch(login(x)).then(async(secc)=>{
          if(secc?.type==="user/loginuser/fulfilled")
           {  
             localStorage.setItem('tocken',secc?.payload?.token);
             localStorage.setItem('user', JSON.stringify(secc?.payload?.data));
             localStorage.setItem('userid', JSON.stringify(secc?.payload?.data?._id));
              setUser(secc?.payload?.data)
              navigate("/")
            //   setnav(true)
              if(secc?.payload?.data?.role==="user")
           {  navigate("/user") }
           else if(secc?.payload?.data?.role==="formateur"){
            navigate("/formateur")
           }else{
            navigate("/admin")
           }
           }
      }).catch(err=>{
          console.log('test2',err)})
    }
    const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  
    function nagigateToOtp() {
      if (email) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        setOTP(OTP);

          dispatch(passwordrecovery({
            OTP,
            email: email,
          })).then(() => {setPage("otp")
                        navigate("/passwordrecovery") })
          .catch(console.log);
        return;
      }
      return alert("Please enter your email");
    }
  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={LoginSchema}>
    {({ values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit,}) => (
      <form onSubmit={handleSubmit}>
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
                setFieldValue("email", e.target.value);
                setEmail(e.target.value)}}
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
              name="password"
              value={values.password}
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{ input: { color: "white" }, "label": {color: "white"} }} 
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill"  color="white"/>
                      ) : (
                        <Icon icon="eva:eye-off-fill" color="white"/>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // color="white"
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
                style={{color:"#BAD7E9"}}
                onClick={()=>nagigateToOtp()}
              >
                Mot de passe oublié?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{backgroundColor:"#2C74B3",color:"white"}}
            >
              Connexion
            </LoadingButton>
          </Box>
        </Box>
      </form>
      )}
      </Formik>
  
  );
};

export default LoginForm;