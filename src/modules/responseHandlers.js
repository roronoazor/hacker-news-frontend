import toast from 'react-hot-toast';
import { checkObject } from '.';
/**
 * 
 * function to handle api errors
 * 
 * this function has side effects
 * 
 * @args error - the error response from the api
 * @return null
 * 
 */
export function handleApiError(errors){
    console.log('errors: ', errors);
    const errorData = errors?.response?.data;
    
    try {
        
        if (errorData instanceof Object) {
            const firstKey = Object.keys(errorData)[0];
            toast.error(errorData[firstKey]);
        }

        if (errorData instanceof Array){
            if (errorData.length > 0){
                toast.error(errorData[0]);
            }
        }

        if (errorData instanceof String){
            toast.error(errorData);
        }

        return;
        
      } catch (error) {
        
        toast.error('An Error Occured please contact admin.');
        return;
        
      }
    
}

/**
 * 
 * function to handle api success
 * 
 * this function has side effects
 * 
 * @args response - success response from the api
 * @return null
 * 
 */
 export function handleApiSuccess(response){
    
    let message = response?.message;
    toast.error(message)
    return
}