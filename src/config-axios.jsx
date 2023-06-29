import axios from 'axios';


const tocken=()=>{
  const accesstoken=window.localStorage.getItem('tocken')
  return accesstoken
}
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });

api.interceptors.request.use((request)=>{
  const token = tocken();
  console.log(token);
  if (token) {
    request.headers.Authorization =  token ? `Bearer ${token}` : '';
  }
      // console.log('request sent');
      return request;

},(error)=>{

    return Promise.reject(error);

})

api.interceptors.response.use((response)=>{
 
      //  console.log("send reponse",response.data);
       return response.data;
    
},(error)=>{
       console.log(error);
      //  if(error.reponse.status===404)
      //  {
      //   console.log("not found");
      //  }
       return Promise.reject(error);
})

export default api;