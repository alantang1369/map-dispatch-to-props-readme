import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {addTodo} from './actions/todo'
class App extends Component {

  state = {
    todo: ''
  }

  handleOnChange = event => {
    this.setState({
      todo: event.target.value
    });
  }
 
  handleOnSubmit = event => {
    event.preventDefault();
    console.log("Todo being added: ", this.state.todo);
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
  }

  
  render() {
    
    const renderTodos = () => this.props.todos.map(todo => <li key={todo}>{todo}</li>);
    return (
      <div className="App">
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <input
          type="text"
          onChange={(event) => this.handleOnChange(event)}
          id="todos"
          placeholder="add todo" 
          value={this.state.todo}/>
        <input type="submit" />
      </form>
      <h2>Todos:</h2>
        <ol>{renderTodos()}</ol>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo) => {
      dispatch(addTodo(todo)) //dispatch(ation), action is a futnion returning a POJO.
    }
  };
};
// export default connect(state => ({ todos: state.todos }), { addTodo })(App); (alternative way to map state and dispatch to props of the connected component)
export default connect(mapStateToProps, mapDispatchToProps)(App);