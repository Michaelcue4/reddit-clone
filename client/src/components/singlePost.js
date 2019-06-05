import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
// , Link
import axios from "axios";

class SinglePost extends Component {
    state = {
        post: {
            title: '',
            info: ''
        },
        resInfo: {
            id: '',
            created_at: '',
            title: '',
            content: ''
        },
        redirectToHome: false,
        isEditFormDisplayed: false,
    }
getpost=()=>{
    axios.get(`/api/v1/posts/${this.props.postId}`).then(res => {
        this.setState({ resInfo: res.data })
    })
}

    componentDidMount = () => {
        this.getpost()
       
    }

    deletePost = () => {
        axios.delete(`/api/v1/posts/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const clonePost = { ...this.state.post }
        clonePost[e.target.title] = e.target.value
        this.setState({ post: clonePost })
    }

    updateCity = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/posts/${this.props.match.params.id}`, {
                name: this.state.post.title,
                description: this.state.post.info
            })
            .then(res => {
                this.setState({ post: res.data, isEditFormDisplayed: false })
            })
            this.getpost()
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/posts" />)
        }

        return (
            <div className="singlePost">
                {/* <Link to="/posts">Back to Posts</Link> */}
                <h1>{this.state.resInfo.title}</h1> 
                <p>{this.state.resInfo.created_at}</p> 
                <h1>{this.state.resInfo.content}</h1> 

                <button onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updatePost}>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    onChange={this.handleChange}
                                    value={this.state.post.title}
                                />
                            </div>
                            <div>
                                <label htmlFor="info">Info</label>
                                <textarea
                                    id="info"
                                    name="info"
                                    onChange={this.handleChange}
                                    value={this.state.post.info}
                                />
                            </div>
                            <button>Update</button>
                        </form>
                        : <div>
                            <button onClick={this.deletePost}>Delete</button>
                        </div>
                }
                       <div>
                        <p>Commennts:</p>
                        {/* <AllComments data= { this.state.resInfo.comments}/> */}
                         {/* {this.state.resInfo.comments} */}
                        </div>
            </div>
        );
    }
}

export default SinglePost;