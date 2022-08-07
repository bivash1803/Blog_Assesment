import Axios from 'axios'
import { validateAll } from 'indicative/validator'
//const { validateAll } = window;
export default class AuthService{
    async registerUser(data){
         var token = 'id' + (new Date()).getTime();

        const rules = {
            name: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|confirmed'
        }   
        const msg = {
            required: 'This {{field}} is required',
            'email.email': 'Email is Invalid..',
            'password.confirmed': 'The password confirmation does not match'

        }

        try {
            await validateAll(data, rules, msg)

            const response  = await Axios.post(`https://62c6ab7774e1381c0a6598ae.mockapi.io/Register`, {
                name: data.name,
                email:data.email,
                password: data.password,
                token:token,
            })
            console.log(response)
            return response.data    
        }catch(errors){
                console.log(errors)
                const formattedErrors = {};
                if(errors.response && errors.response.status===422){
                    //eslint-disable-next-line
                        console.log(formattedErrors)
                        formattedErrors['email'] = errors.response.data['email'][0]
                       return Promise.reject(formattedErrors) 
                } 
            errors.forEach(error => formattedErrors[error.field] = error.message)
            return Promise.reject(formattedErrors)
        }
    }
    async loginUser(data){
        const rules = {
            email: 'required|email',
            password: 'required|string'
        }
        const msg = {
            required: 'This {{field}} is required',
            'email.email': 'Email is Invalid..',

        }

        try {
            await validateAll(data, rules, msg)

            const response  = await Axios.get(`https://62c6ab7774e1381c0a6598ae.mockapi.io/Register`, {
                email:data.email,
                password: data.password
            })
            console.log(response)
            return response.data    
        }catch(errors){
                console.log(errors)
                const formattedErrors = {};
                if(errors.response && errors.response.status===401){
                    //eslint-disable-next-line
                        console.log(formattedErrors)
                        formattedErrors['email'] = "Invalid Credentials.."
                       return Promise.reject(formattedErrors) 
                } 
            errors.forEach(error => formattedErrors[error.field] = error.message)
            return Promise.reject(formattedErrors)
        }
    }
}