
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DonutChart from 'react-donut-chart';
import ReactApexChart from 'react-apexcharts';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../../config-axios";


const Dashboard=()=>{
    const [contuser,setCountUser]=useState(0)
    const [contcour,setCountCour]=useState(0)
    const [topcour,setTopCour]=useState([])
    const [loading,setLoading]=useState(true)
    const [contcourformateur,setCountCourFormateur]=useState(0)
    useEffect(()=>{
        
      async function fetchData() {
           const x=await api.get("/user/count/")
           const y=await api.get("/cour/count/")
           const z=await api.get("/cour/top")
           const q=await api.get("/cour/countcourbyformateur/")
         console.log(q)
          setCountUser(x)
          setCountCour(y.data)
          setTopCour(z.data)
          let a=[]
          let b=[]
          q?.data?.map(item=>{
            a.push(item.count)
            b.push(item.fullName)
          })
           setCountCourFormateur({data:a,categories:b})
          setLoading(false)
        }
        fetchData();
    },[]) 
     const series= [{
         data: contcourformateur?.data
       
      }]
  const  options= {
    chart: {
      foreColor: '#BAD7E9',
      type: 'bar',
      height: 380
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
      '#f48024', '#69d2e7'
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {colors: ['#fff']},
      formatter:  (val, opt)=> {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
       categories: contcourformateur?.categories,
      // categories: ["user1","user2","user3","user4","user5","user6"],
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
        text: 'Nombre  de cours par formateur',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: '',
        align: 'center',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: () =>{
          return ''
        }
      }
    }
  }
const  series2= [{
  name: "Commande",
  data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
}]
const  options2={
  chart: {
    foreColor: '#BAD7E9',
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Tendances des commandes par mois',
    align: 'left',
    colors:["#BAD7E9"]
  },
  grid: {
    row: {
      colors: ['#2C74B3', '#BAD7E9'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
}
      return <div style={{marginBottom:"50px"}}>
      <Box sx={{ width: '100%'}}>



         </Box>
         {loading ? <div style={{display: "flex",
    justifyContent: "center",
    marginTop: "81px"}}><CircularProgress style={{'color': 'white'}}/> </div>:
    <>
         <ProgressBar variant="success" now={40} />
      <div style={{margin:"20px",display:"flex",justifyContent:"space-between"}}>
      <Card sx={{ background: "#144272",width: "462px",height: "150px" }}>
       <CardContent>
       <div style={{display:"flex",justifyContent:"space-between"}}>
         <img src="./cour.png"     width="141px"/>
         <Typography style={{  margin:"10px" ,fontSize: "20px",marginTop:"30px", color:'white'}} color="primary" component="div" variant="h1" >
          Nombre <br/> des cours
         </Typography>
         <p style={{margin: "auto",fontSize: "27px", color:'white'}}><b>{contcour}</b></p>
         </div>
        </CardContent>
        </Card>
        <Card sx={{ background: "#144272",width: "462px",height: "150px" }}>
       <CardContent>
       <div style={{display:"flex",justifyContent:"space-between"}}>
         <img src="./user.png"     width="141px"/>
         <Typography style={{  margin:"10px" ,fontSize: "20px",marginTop:"40px", color:'white'}} color="primary" component="div" variant="h1" >
          Nombre <br/> des utilisateurs
         </Typography>
         <p style={{margin: "auto",fontSize: "27px", color:'white'}}><b>{contuser?.utilisateur}</b></p>
         </div>
        </CardContent>
        </Card>
        <Card sx={{ background: "#144272",width: "462px",height: "150px" }}>
       <CardContent>
       <div style={{display:"flex",justifyContent:"space-between"}}>
         <img src="./formateur.png"     width="100px"/>
         <Typography style={{  margin:"10px" ,fontSize: "20px",marginTop:"40px", color:'white'}} color="primary" component="div" variant="h1" >
          Nombre <br/> des formateurs
         </Typography>
         <p style={{margin: "auto",fontSize: "27px", color:'white'}}><b>{contuser?.formateur}</b></p>
         </div>
        </CardContent>
        </Card>
      </div>
      <div style={{display: "flex"}}>
      <Card sx={{ background: "#144272",width: "550px",height: "464px" , margin:"20px"}}>
       <CardContent>
       <Typography style={{ fontSize: "20px",marginTop:"20px",textAlign:"center",marginBottom:"33px",fontWeight: "900", color:'white'}}  component="div" variant="h1" >
        <b> TOP 5 cours acheter </b> 
         </Typography>
        <div>
          {
            topcour.map(item=>{
              return   <div style={{display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              backgroundColor:"#2C74B3",
              color:"white",
              borderRadius:"10px",
              marginBottom:"15px"}}>
          <p>{item?.titre}</p>
          <p>{item?.nb_user}</p>
            </div>
            })
          }
          

        </div>
        </CardContent>
        </Card>
        <Card sx={{ background: "#144272",width: "900px",height: "464px" , margin:"20px"}}>
       <CardContent>
       <ReactApexChart options={options2} series={series2} type="line" height={350} />
       </CardContent>
       </Card>
        </div>
       <Card sx={{ background: "#144272",width: "1470px",height: "464px" , margin:"20px"}}>
       <CardContent>
        <ReactApexChart options={options} series={series} type="bar" height={380} />
        </CardContent>
        </Card>
        </>}
     </div>
}

export default Dashboard;