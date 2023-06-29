import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider,Alert } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../component/loginForm";
import { motion } from "framer-motion";
import {useSelector } from 'react-redux';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      </Typography>
    );
  }

const RootStyle = styled("div")({
  // background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
  color:"white"
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
  backgroundColor:"#144272"
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor:"#144272"
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Login = () => {
  const {statuslogin} = useSelector(state=>state.user)
  const {data} = useSelector(state=>state.user)
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} class="center" >
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ color: "white", mb: 5 }}>
          Connectez-vous à votre compte
            </Typography>
          </HeadingStyle>

          { <LoginForm /> }

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
           Vous n'avez pas de compte ?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/signup" style={{color:"#BAD7E9"}}>
            S'inscrire
            </Link>
          </Typography>
          <Copyright sx={{ mt: 5 }} />
        </ContentStyle>
       
      </Container>
      <div>
      {statuslogin==="failed" ? <Alert severity="error">Mot de passe ou adresse e-mail incorrect </Alert> :null}
      </div>
    </RootStyle>
  );
};

export default Login;
