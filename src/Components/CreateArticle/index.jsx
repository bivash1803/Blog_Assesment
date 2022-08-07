import PropTypes from 'prop-types'
import React from 'react';
import CreateArticleForm from './CreateArticleForm';
class CreateArticle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            image: null,
            content: '',
            category: null,
            errors: [],
            categories: [],
            editing: false,
            article: []
        }
    }
    async UNSAFE_componentWillMount() {
        const categories = await this.props.getArticleCategories();
        const article = this.props.articles
        console.log(this.props)
        if (this.props.match.params.slug) {
            // const article = this.props.articles.find((articleInArray) => {
            //     articleInArray.slugs === this.props.match.params.slug
            // }
            // /)
            this.setState({ editing: true,
                article,
                categories,
                title: article.title,
                category: article.category,
                content: article.content,
            })
        }
        else {
            this.setState({
                categories
            })
        }

    }

    handleSubmit = async (event) => {
        console.log('submitting form')
        event.preventDefault()
        try {
         await this.props.createArticle(this.state, this.props.token);
         this.props.notyService.success('Article created successfully')
            this.props.history.push("/")
        } catch (errors) {
            this.props.notyService.error("Please check the errors. Something went Wrong.")
            console.log(errors)
            this.setState({ errors })
        }
    }

    updateArticle = async(event)=>{
        event.preventDefault()
        console.log('updating artcile')
        try{
            await this.props.updateArticle({
                title:this.state.title,
                image:this.state.image,
                content:this.state.content,
                category:this.state.category,
            },this.state.article,this.props.token);
            this.props.notyService.success('Artcles Updated Successfully');

            this.props.history.push("/")
        }catch(errors){
            this.props.notyService.error('please chack for errors. Something went wrong.')
            this.setState({errors})
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: (event.target.type === 'file' ? event.target.files[0] : event.target.value)
        })
        console.log(this.state)
        console.log('updating inputs')
    }



    render() {
        console.log(this.props.token)
        return (
            <CreateArticleForm
                handleInputChange={this.handleInputChange}
                categories={this.state.categories}
                handleSubmit={this.handleSubmit}
                errors={this.state.errors}
                editing={this.state.editing}
                article={this.state.article}
                title={this.state.title}
                content={this.state.content}
                category={this.state.category}
                updateArticle ={this.updateArticle}
            />
        )
    }
}
CreateArticle.propTypes = {
    getArticleCategories: PropTypes.func.isRequired,
    createArticle: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
      })),
      updateArticle:PropTypes.func,
      notyService: PropTypes.shape({
        success: PropTypes.func.isRequired,
        error: PropTypes.func.isRequired,
      }).isRequired,

    }
  

export default CreateArticle;