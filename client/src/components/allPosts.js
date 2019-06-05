import React, { Component } from 'react'
import axios from 'axios'
import { Link, Router, Route } from 'react-router-dom'
import SinglePost from './singlePost';

class Posts extends Component {
    state = {
        posts: [],
        newPost: {
            title: '',
            info: ''
        },
        isPostFormDisplayed: false,
        showSingleForm: false,
        postId: 0
    }

    componentDidMount = () => {
        axios.get('api/v1/posts/').then(res => {
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

    toggleSinglePost = e => {
        this.setState({showSingleForm: !this.state.showSingleForm, postId: e.target.id})
    }

    createPost = (e) => {
        e.preventDefault()
        axios
            .post('api/v1/posts/', {
                title: this.state.newPost.title,
                info: this.state.newPost.info
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
            !this.state.showSingleForm ?
            <div className="postPage">
                <h3>Posts</h3>
                <div className="postImg"></div>

                <div className="postList">

                    {this.state.posts.map(post => {
                        return (
                            <div key={post.id}>
                                <button id={post.id} onClick={this.toggleSinglePost}>
                                    {post.title}
                                </button>
                            </div>
                            // < AllComments key={i} />
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

            </div>: <SinglePost postId={this.state.postId}></SinglePost>
        )
    }
}

export default Posts