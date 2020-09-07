import React from 'react';
import './todo-list-item.css';

export default class TodoListItem extends React.Component{
    constructor(){
        super();

        this.state = {
            done: false,
            important: false
        };
        // this.onLabelClick = this.onLabelClick.bind(this);
        // this.onMarkImportant = this.onMarkImportant.bind(this);
    }
    
    // onLabelClick(){
    //     this.setState((state) => {
    //         return {
    //             done: !state.done  
    //         }
    //     })
    // }

    // onMarkImportant(){
    //     this.setState((state) => {
    //         return {
    //             important: !state.important
    //         }
    //     })
    // }

    render(){
        const {
            label, onDeleted, 
            onToggleDone, 
            onToggleImportant, 
            done, important} = this.props;
        // const {done, important} = this.state

        // const listStyle = {
        //     color: important ? 'steelblue' : 'black',
        // }
        let className = 'todo-list-item'
        className = done 
            ? `${className} done` 
            : className 

        className = important
            ? `${className} important`
            : className 
        
        return (
            <span className={className}>
                <span 
                    className="todo-list-item-label "
                    // style={listStyle} 
                    onClick={onToggleDone}>
                    {label}
                </span>
                <button 
                    type="button" 
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onToggleImportant}>
                    <i className="fa fa-exclamation"></i>
                </button>
                <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </span>
        )
    }
}

