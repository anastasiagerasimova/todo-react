import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import TodoList from '../todo-list/todo-list';
import ItemAddForm from '../item-add-form/item-add-form';
import './app.css';

export default class App extends React.Component {
	constructor(){
		super();
		this.maxID = 100;
		this.state = {
			todoData:[
				this.createItem('Drink coffee'),
				this.createItem('Make react app'),
				this.createItem('Have a lunch'),
			],
			term: '', 
			filter: 'all'
		};
		window.state = this.state
		this.onDeleted = this.onDeleted.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onToggleDone = this.onToggleDone.bind(this);
		this.onToggleImportant = this.onToggleImportant.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this)
	}

	createItem(label){
		return {label, important: false, done: false, id: this.maxID++}
	}

	toggleProperty(items, field, id){
		const idx = items.findIndex((el) => el.id === id);
		const oldItem = items[idx];
		const newItem = {...oldItem, [field]: !oldItem[field]}
		return [
			...items.slice(0, idx),
			newItem, 
			...items.slice(idx + 1)
		];
	}

	onDeleted(id){
		this.setState((state) =>{
			const idx = state.todoData.findIndex((el) => el.id === id);	
			const newArray = [...state.todoData.slice(0, idx), ...state.todoData.slice(idx + 1)];
			return{
				todoData: newArray
			}
		})
	}

	onAdd(text){
		const newItem = this.createItem(text)
		this.setState((state) => {
			const newArray = [...state.todoData, newItem]
			return {
				todoData: newArray
			}
		})
	}

	onToggleDone(id){
		this.setState(({todoData}) => {
			const items = this.toggleProperty(todoData, 'done', id)
			return{
				todoData: items
			}
		})
	}

	onToggleImportant(id){
		this.setState(({todoData}) => {
			const items = this.toggleProperty(todoData, 'important', id)
			return{
				todoData: items
			}
		})
	}
	
	onSearchChange(term){
		this.setState({term})
	}
	
	onFilterChange(filter){
		this.setState({filter})
	}

	search(items, term){
		if(term.trim() === ''){
			return items
		}
		return items.filter((el) => {
			return el.label
				.toLowerCase()
				.indexOf(term.toLowerCase().trim()) > -1
		})
	}

	
	filterItems(items, filter){
		switch(filter){
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => !item.done);
			case 'done':
				return items.filter((item) => item.done);
			default: 
				return items;
		}
	}


	render(){
		const doneCount = this.state.todoData
							.filter((el) => el.done)
							.length;

		const todoCount = this.state.todoData
							.filter((el) => !el.done)
							.length;

		const{todoData, term, filter} = this.state
		const visibleItems = this.filterItems(this.search(todoData, term), filter);

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange}/>
					<ItemStatusFilter
						filter={filter}
						onFilterChange={this.onFilterChange}/>
				</div>
				<TodoList 
					// todos={this.state.todoData} 
					todos={visibleItems} 
					onDeleted={this.onDeleted}
					onToggleDone={this.onToggleDone}
					onToggleImportant={this.onToggleImportant}/>
				<ItemAddForm onAdd={this.onAdd}/>
			</div>
		)
	}
}
