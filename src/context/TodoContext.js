import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const getTodosFormLocalStorage = () => {
    const data = localStorage.getItem('todos');
    return data === null || !data.length ? [] : JSON.parse(data);
  };

  const [todos, setTodos] = useState(getTodosFormLocalStorage());

  const setTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: uuidv4(), completed: false }]);
  };

  const editTodo = (id, text, priority) => {
    setTodos(() =>
      todos.map((todo) => (todo.id === id ? { ...todo, text, priority } : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        editTodo,
        toggleTodo,
        setTodosToLocalStorage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
