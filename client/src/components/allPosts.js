import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Posts extends Component {
    state = {
        Posts: [],
        newPost: {
            title: '',
            info: ''
        },
        isPostFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('api/posts').then(res => {
            this.setState({ posts: res.data })
        })
    }

    togglePostForm = () => {
        this.setState((state, props) => {
            return ({ isPostFormDisplayed: !state.isPostFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewPost = { ...this.state.newPost }
        cloneNewPost[e.target.name] = e.target.value
        this.setState({ newPost: cloneNewPost })
    }

    createPost = (e) => {
        e.preventDefault()
        axios
            .post('api/posts', {
                name: this.state.newPost.name,
                description: this.state.newPost.description
            })
            .then(res => {
                const postsList = [...this.state.posts]
                postsList.unshift(res.data)
                this.setState({
                    newPost: {
                        title: '',
                        info: ''
                    },
                    isPostFormDisplayed: false,
                    posts: postsList
                })
            })

    }

    render() {
        return (


            <div className="postPage">
                <h3>Posts</h3>
                <div className="postImg"></div>

                <div className="postList">

                    {this.state.posts.map(post => {
                        return (
                            <div key={post._id}>
                                <Link
                                    to={`/posts/${post._id}`}
                                >
                                    {post.name}
                                </Link>
                            </div>
                        )
                    })
                    }
                    <button onClick={this.togglePostForm}>+ New Post </button>
                    {
                        this.state.isPostFormDisplayed
                            ? <form onSubmit={this.createPost}>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="title"
                                        onChange={this.handleChange}
                                        value={this.state.newPost.title}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info">Info</label>
                                    <textarea
                                        id="info"
                                        type="text"
                                        name="info"
                                        onChange={this.handleChange}
                                        value={this.state.newPost.info}
                                    />
                                </div>
                                <button>Create</button>
                            </form>
                            : null
                    }
                </div>

            </div>

        )
    }
}

export default Posts