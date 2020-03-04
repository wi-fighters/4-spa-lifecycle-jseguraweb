import React, { Component } from 'react'
import User from './User'
import './SearchResults.scss'

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            users: [],
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

    lastSearchFor = null

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.lastSearchTerm === this.lastSearchFor) {
            return false;
        } else {
            this.lastSearchFor = nextProps.lastSearchTerm;
            return true
        }

    }

    render() {
        console.log('...RENDERING...');
        let allUsers = this.state.users
            .filter(user => user.name.toLocaleLowerCase().indexOf(this.props.lastSearchTerm.toLocaleLowerCase()) !== -1 ||
                user.email.toLocaleLowerCase().indexOf(this.props.lastSearchTerm.toLocaleLowerCase()) !== -1)
            .map((user, i) => <User key={i} id={user.id} name={user.name} email={user.email} />);

        return (
            <div className="container">
                <form onSubmit={this.props.handleSubmit}>
                    <input className="text-input" type="text" placeholder="Enter search term" onChange={this.props.updateSearchTerm} />
                    <input className="submit-button" type="submit" value="Search" />
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