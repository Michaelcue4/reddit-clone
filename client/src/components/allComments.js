import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Comments extends Component {
    state = {
        comments: [],
        newComment: {
            description: ''
        },
        isPostFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('api/comments').then(res => {
            this.setState({ comments: res.data })
        })
    }

    toggleCommentForm = () => {
        this.setState((state, props) => {
            return ({ isCommentFormDisplayed: !state.isCommentFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewComment = { ...this.state.newComment }
        cloneNewComment[e.target.description] = e.target.value
        this.setState({ newComment: cloneNewComment })
    }

    createComment = (e) => {
        e.preventDefault()
        axios
            .post('api/comments', {
                description: this.state.newComment.description
            })
            .then(res => {
                const commentsList = [...this.state.comments]
                commentsList.unshift(res.data)
                this.setState({
                    newComment: {
                        description: ''
                    },
                    isPostFormDisplayed: false,
                    comments: commentsList
                })
            })

    }

    render() {
        return (


            <div className="CommentPage">
                <h3>Comments</h3>
                <div className="commentImg"></div>

                <div className="commentList">

                    {this.state.comments.map(comment => {
                        return (
                            <div key={comment._id}>
                                <Link
                                    to={`/comments/${comment._id}`}
                                >
                                    {comment.description}
                                </Link>
                            </div>
                        )
                    })
                    }
                    <button onClick={this.toggleCommentForm}>+ New Comment </button>
                    {
                        this.state.isCommentFormDisplayed
                            ? <form onSubmit={this.createComment}>
                                <div>
                                    <label htmlFor="description"> Description </label>
                                    <input
                                        id="description"
                                        type="text"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.newComment.description}
                                    />
                                </div>
                                <button> Submit </button>
                            </form>
                            : null
                    }
                </div>

            </div>

        )
    }
}

export default Comments