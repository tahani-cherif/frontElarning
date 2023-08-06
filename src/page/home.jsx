
import {getALLcour} from "../redux/cour"
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Course from "../component/course";
import ImageSlider from "../component/ImageSlider";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  {getALLcategory} from '../redux/category'
import InputLabel from '@mui/material/InputLabel';
import { TextField, makeStyles } from '@material-ui/core';
import { setDate } from "date-fns";
import moment from "moment";


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
const useStylesdate = makeStyles(theme => ({
  root: {
    "& .MuiFormLabel-root": {
      color: "white" // or black
    }
  }
}));
const Home=()=>{
    const classesselect = useStylesdate();
    const classes = useStylesSelect();
    const { error } = useSelector(state => state.cour)
    const { status } = useSelector(state => state.cour)
    const { datacour } = useSelector(state => state.cour)  
      const {data} = useSelector(state=>state.category)
    const user=JSON.parse(localStorage.getItem('user'));
    const [startDate, setStartDate] = useState();
    const [category, setcategory] = useState("tous");
    const [langue, setlangue] = useState('tous');
    const [prix, setprix] = useState('alt');
    const [date, setdate] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getALLcour())
      dispatch(getALLcategory())
    }, [])
    let z=""
  console.log("ddddddddddd",startDate,z)
    return  <div className="container mx-auto p-16">
      {status==="loading" ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{color:"white"}} /> </div>:
    <>
    <ImageSlider />
        <div className="grid grid-cols-4 gap-4 mb-6">
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker label="Chercher cours par date " onChange={(e)=>{
          setdate(true)
          console.log(e.$d)
          setStartDate(moment(e.$d).format("l"))
          z=moment(e.$d).format("l")
         }}
         renderInput={(params) => (
          <TextField
            {...params}
            style={{ color: "white" }}
          />
        )}
         />
          
    </LocalizationProvider>
    <FormControl variant="standard"  className={classesselect.customFormControl}>
    <InputLabel id="demo-simple-select-standard-label" style={{ color: 'white' }}>chercher cours par categorie</InputLabel>
       <Select
      className={classesselect.customSelect}
       labelId="demo-simple-select-standard-label"
       id="demo-simple-select-standard"
       label="categorie"
       name="categorie"
       defaultValue={"tous"}
       SelectDisplayProps={{ style: { color:"white"} }}
       onChange={(e)=>setcategory(e.target.value)}
        >
            {
                data?.map(item=>  <MenuItem value={item?.category}>{item?.category}</MenuItem>)
            }
             <MenuItem value="tous">tous</MenuItem>
       </Select>
       </FormControl>
       <FormControl variant="standard"  className={classesselect.customFormControl}>
    <InputLabel id="demo-simple-select-standard-label" style={{ color: 'white' }}>Tri par prix</InputLabel>
       <Select
       className={classesselect.customSelect}
       labelId="demo-simple-select-standard-label"
       id="demo-simple-select-standard"
       label="categorie"
       name="categorie"
       defaultValue={"alt"}
       SelectDisplayProps={{ style: { color:"white"} }}
       onChange={(e)=>setprix(e.target.value)}
        >
           
          <MenuItem value="ASK">Prix croissant</MenuItem>
          <MenuItem value="DESK">Prix décroissant</MenuItem>
          <MenuItem value="alt">Aléatoire</MenuItem>
     
       </Select>
       </FormControl>
       <FormControl variant="standard"  className={classesselect.customFormControl}>
    <InputLabel id="demo-simple-select-standard-label" style={{ color: 'white' }}>chercher cours par langue</InputLabel>
       <Select
        className={classesselect.customSelect}
       labelId="demo-simple-select-standard-label"
       id="demo-simple-select-standard"
       label="chercher cours par langue"
       name="categorie"
       defaultValue={"tous"}
       SelectDisplayProps={{ style: { color:"white"} }}
       onChange={(e)=>setlangue(e.target.value)}
        >
           
          <MenuItem value="Français">Français</MenuItem>
          <MenuItem value="Anglais">Anglais</MenuItem>
          <MenuItem value="tous">tous</MenuItem>
     
       </Select>
       </FormControl>
        </div>
        <div className='grid grid-cols-3 gap-3'>
        { 
            datacour
            .slice()?.sort((a, b)=>prix==="alt"? true : prix==="ASK" ? a.actual_Price - b.actual_Price :b.actual_Price - a.actual_Price)
            ?.filter(x =>category==="tous" ? true : x.categorie===category)
            ?.filter(x =>{
              console.log("qsssssssss",moment(x.createdAt).format("l"),startDate,moment(x.createdAt).format("l")===startDate)
               if(date==true)
               {
                //  console.log("11")
                if(moment(x.createdAt).format("l")===startDate)
                   
                { 
                  console.log("22")
                  return true
                }
                    else {
                      // console.log("33")
                      return false
                    }
               }else{
                // console.log("44")
                return true
               }
                })
            ?.filter(x =>langue==="tous" ? true : x.langue===langue)
            ?.filter(y=>{
                let etat=true
               user?.Courses?.map(item=>{
                 if( item===y._id)
                 {
                   etat=false
                 }
                
               })
               return etat
              })?.filter(x => x.isDeleted==false && x.isfinish)
            // ?.filter(course =>activeTab!=null ? course?.categorie === activeTab :true)
            .map((course) => (
              <Course key = {course._id} {...course} />
            )) 
            }
          
          </div>
          </>
        }</div>
}

export default Home;