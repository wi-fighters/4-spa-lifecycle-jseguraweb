import React, { Component } from 'react'
import User from './User'
import './SearchResults.scss'

export default class SearchResults extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            searchTerm: '',
            lastSearchTerm: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.setState({
            users: data
        })
    }

    saveInput = e => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            lastSearchTerm: this.state.searchTerm
        })
    }

    render() {
        let allUsers = this.state.users
            .filter(user => user.name.toLocaleLowerCase().indexOf(this.state.lastSearchTerm.toLocaleLowerCase()) !== -1 ||
                user.email.toLocaleLowerCase().indexOf(this.state.lastSearchTerm.toLocaleLowerCase()) !== -1)
            .map((user, i) => <User key={i} id={user.id} name={user.name} email={user.email} />);

        return (
            <div className="container">
                <form action="#" onSubmit={this.searchUser}>
                    <input className="text-input" type="text" placeholder="Enter search term" onChange={this.saveInput} value={this.state.input} />
                    <input className="submit-button" type="submit" value="Search" onClick={this.handleSubmit} />
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers}
                    </tbody>

                </table>
            </div>
        )
    }
}