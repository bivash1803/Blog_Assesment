import Axios from "axios";
import { validateAll } from "indicative/validator";

export default class ArticleService {

    async getArticles(url=`https://62d10cb3d9bf9f1705917522.mockapi.io/getArticles`){
        const response = await Axios.get(url)

        return response.data
    }

    async getArticle(slug){
        const response = await Axios.get(`https://62d10cb3d9bf9f1705917522.mockapi.io/getArticles/${slug}`)

        return response.data
    }
    async getUserArticles(myToken){ 
        const response = await Axios.get("https://62d10cb3d9bf9f1705917522.mockapi.io/getArticles")
        const articles = response.data
        let newArticles= [];
        for(let i=0;i<articles.length;i++){
            if(articles[i].token == myToken){
                newArticles.push(articles[i]);
            }
        }
        return  newArticles;
    }
    async deleteArticle(id){
        await Axios.delete(`https://62d10cb3d9bf9f1705917522.mockapi.io/getArticles/${id}`)
        return true
    }

    async getArticleCategories() {
        const categories = JSON.parse(localStorage.getItem('categories'))

        if(categories){
            return categories
        }

        const response = await Axios.get(`https://62d10cb3d9bf9f1705917522.mockapi.io/Article`);
        localStorage.setItem('categories',JSON.stringify(response.data))
        return response.data
    }


    updateArticle = async (data, article, token) => {
        const date = new Date();
        const articleDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        
        let image
        if (data.image) {
           image = await this.uploadToCloudinary(data.image)
          }
        try {

            const rules = {
                title: 'required',
                content: 'required',
                category: 'required',
            }

            const message = {
                required: 'The {{field}} is required',
            }

            await validateAll(data, rules, message,)


            const response = await Axios.put(`https://62d10cb3d9bf9f1705917522.mockapi.io/getArticles/${article.id}`, {
                title: data.title,
                content: data.content,
                category: data.category,
                imageUrl: image?image.secure_url:article.imageUrl,
                token:token,
                created_at:articleDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            
            return response.data
        } catch (errors) {
            console.log(errors)
            if (errors.response) {
                return Promise.reject(errors.response.data);
            }

            return Promise.reject(errors);
        }



    }

    createArticle = async (data, token) => {
        const date = new Date();
        const articleDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        
        const image = await this.uploadToCloudinary(data.image)
        if (!data.image) {
            return Promise.reject([{
              message: 'The image is required.',
            }]);
          }
        try {

            const rules = {
                title: 'required',
                content: 'required',
                category: 'required',
            }

            const message = {
                required: 'The {{field}} is required',
            }

            await validateAll(data, rules, message,)


            const response = await Axios.post(`https://62d10cb3d9bf9f1705917522.mockapi.io/getArticles`, {
                title: data.title,
                content: data.content,
                category: data.category,
                imageUrl: image.secure_url,
                token:token,
                created_at:articleDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            
            return response.data
        } catch (errors) {
            console.log(errors)
            if (errors.response) {
                return Promise.reject(errors.response.data);
            }

            return Promise.reject(errors);
        }



    }

    async uploadToCloudinary(image) {
        const form = new FormData();
        form.append('file', image);
        form.append('upload_preset', 'asae9sgz')
        form.append('api_key', '613346275219149')

        const response = await Axios.post('https://api.cloudinary.com/v1_1/blog-application/image/upload', form)

        return response.data;
    }


}