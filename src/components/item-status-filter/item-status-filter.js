import React from 'react';
import './item-status-filter.css';

export default class itemStatusFilter extends React.Component{
    constructor(){
        super();
        this.buttons =[
            {name: 'all', label: 'All'},
            {name: 'active', label: 'Active'},
            {name: 'done', label: 'Done'}
        ]
    }

    render(){
        const {filter, onFilterChange} = this.props;
        
        const buttons = this.buttons.map(btn => {
            const clazz = filter === btn.name 
                            ? 'btn btn-outline-info active'
                            : 'btn btn-outline-info'
            return (
                <button 
                    type="button" 
                    className={clazz}
                    onClick={()=>{onFilterChange(btn.name)}}
                    key={btn.name}>
                    {btn.label}
                </button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
