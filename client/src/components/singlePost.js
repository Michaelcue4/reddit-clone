// import React, { Component } from "react";
// import { Redirect, Link } from 'react-router-dom';
// import axios from "axios";

// class SingleCity extends Component {
//     state = {
//         city: {
//             name: '',
//             description: ''
//         },
//         resInfo: {
//             city: {
//                 _id: '',
//                 name: '',
//                 description: ''
//             },
//             parks: []
//         },
//         redirectToHome: false,
//         isEditFormDisplayed: false
//     }
// getcity=()=>{
//     axios.get(`/api/cities/${this.props.match.params.id}`).then(res => {
//         console.log(res.data)
//         this.setState({ resInfo: res.data })
//     })
// }

//     componentDidMount = () => {
//         this.getcity()
       
//     }

//     deleteCity = () => {
//         axios.delete(`/api/cities/${this.props.match.params.id}`).then(res => {
//             this.setState({ redirectToHome: true })
//         })
//     }

//     toggleEditForm = () => {
//         this.setState((state, props) => {
//             return { isEditFormDisplayed: !state.isEditFormDisplayed }
//         })
//     }

//     handleChange = (e) => {
//         const cloneCity = { ...this.state.city }
//         cloneCity[e.target.name] = e.target.value
//         this.setState({ city: cloneCity })
//     }

//     updateCity = (e) => {
//         e.preventDefault()
//         axios
//             .put(`/api/cities/${this.props.match.params.id}`, {
//                 name: this.state.city.name,
//                 description: this.state.city.description
//             })
//             .then(res => {
//                 this.setState({ city: res.data, isEditFormDisplayed: false })
//             })
//             this.getcity()
//     }

//     render() {
//         if (this.state.redirectToHome) {
//             return (<Redirect to="/cities" />)
//         }

//         return (
//             <div className="singleCity">
//                 <Link to="/cities">Back to Cities</Link>
//                 <h1>{this.state.resInfo.city.name}</h1>
//                 <p>{this.state.resInfo.city.description}</p>
//                 <button onClick={this.toggleEditForm}>Edit</button>
//                 {
//                     this.state.isEditFormDisplayed
//                         ? <form onSubmit={this.updateCity}>
//                             <div>
//                                 <label htmlFor="name">Name</label>
//                                 <input
//                                     id="name"
//                                     type="text"
//                                     name="name"
//                                     onChange={this.handleChange}
//                                     value={this.state.city.name}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="description">Description</label>
//                                 <textarea
//                                     id="description"
//                                     name="description"
//                                     onChange={this.handleChange}
//                                     value={this.state.city.description}
//                                 />
//                             </div>
//                             <button>Update</button>
//                         </form>
//                         : <div>
//                             <div>
//                                 Name: {this.state.city.name}
//                             </div>
//                             <div>
//                                 Description: {this.state.city.description}
//                             </div>
//                             <button onClick={this.deleteCity}>Delete</button>
//                         </div>
//                 }
//             </div>
//         );
//     }
// }

// export default SingleCity;