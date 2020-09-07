import React from 'react';
import './search-panel.css'

export default class SearchPanel extends React.Component{
    constructor(){
        super();
        this.state = {
            term: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this)
    }


    onSearchChange(e){
        const term = e.target.value;
        this.setState({term})
        this.props.onSearchChange(term)
    }
    
    render(){
        return(
            <input 
                type="text" 
                className="form-control search-input" 
                placeholder="search"
                onChange={this.onSearchChange}
                value={this.state.term}
            />
        )
    }
}