import React, { Component } from 'react';
import './App.scss';
import Header from './Header';
import SearchResults from './SearchResults';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      lastSearchTerm: ''
    }
  }

  updateSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSubmit = e => {
    console.log('WORKING');
    e.preventDefault();
    this.setState({
      lastSearchTerm: this.state.searchTerm
    })
  }

  render() {
    return (
      <div className="layout">
        <Header />
        <SearchResults updateSearchTerm={this.updateSearchTerm} handleSubmit={this.handleSubmit} lastSearchTerm={this.state.lastSearchTerm} />
      </div>
    );
  }
}

export default App;
