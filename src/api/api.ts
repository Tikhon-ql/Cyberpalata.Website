import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const api = axios.create({baseURL: 'https://localhost:7227'});
//https://localhost:7227
//https://dotnetinternship2022.norwayeast.cloudapp.azure.com:84/
api.interceptors.request.use(
    config=> {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken)
        {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config
    },
    error=>{
        console.error();
        return Promise.reject(error);
    }   
)


// api.interceptors.response.use(
//     response=>response,
//     error=>{
//         const navigate = useNavigate();
//         if(error.response.status >= 500 && error.response.status <= 599)
//         {
//             console.log("ANIME");
//             console.dir(error);
//             navigate("/500");
//         }
//         if(error.response.status === 404)
//         {
//             window.location.replace("/404");
//         }
//         return Promise.reject(error);
//     }
// )

export default api;