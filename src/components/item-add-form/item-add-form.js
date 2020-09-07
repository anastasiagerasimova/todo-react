import React from 'react';
import './item-add-form.css'

export default class ItemAddForm extends React.Component{
    constructor(){
        super();
        this.state = {
            label: ''
        }

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onAdd(this.state.label)
        this.setState({
            label: ''
        })
    }

    onLabelChange(e){
        this.setState({
            label: e.target.value
        })
    }

    render(){
        return (
            <form className="d-flex bottom-panel"
                onSubmit={this.onSubmit}>
                <input type="text" 
                    className="form-control add-input" 
                    placeholder="What needs to be done?"
                    onChange={this.onLabelChange}
                    value={this.state.label}/>
                <button 
                    type='submit'
                    className="btn btn-outline-secondary" 
                    // onClick={() => {this.props.onAdd(this.state.label)}}>Button</button>
                    // onClick={this.onSubmit}
                    >Button</button>
            </form>
        );
    }
}
