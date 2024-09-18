import { useContext, useRef, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = ({ view }) => {
  const { todos, setTodosToLocalStorage } = useContext(TodoContext);
  const [currentTodos, setCurrentTodos] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    setTodosToLocalStorage(todos);

    setCurrentTodos(
      todos.filter((todo) => (view ? !todo.completed : todo.completed))
    );
  }, [view, todos]);

  return (
    <div ref={listRef} className="todo__list">
      {currentTodos.length ? (
        currentTodos
          .map((todo) => <TodoItem {...todo} key={todo.id} />)
          .reverse()
      ) : (
        <div className="todo__no-results">
          There are no {!view && 'completed'} tasks
        </div>
      )}
    </div>
  );
};

export default TodoList;
