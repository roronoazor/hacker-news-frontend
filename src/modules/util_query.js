import toast from 'react-hot-toast';
import axios from 'axios';


export const fetchData = async ({queryKey}) => {
    // a hook that fetches data
    const [_key, {payload_data, url}] = queryKey;
      
    let response_data = await axios.get(url, payload_data);
  
    return response_data;
  }
  
  
  export const postData = async (data) => {
    // a hook that fetches data
    const {payload_data, url} = data;
      
     const config = {};

    let response_data = await axios.post(url, payload_data, config);
  
    return response_data;
  }