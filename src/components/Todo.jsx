import { useState } from 'react';
import { TodoProvider } from '../context/TodoContext';
import { TodoPopupProvider } from '../context/TodoPopupContext';
import TodoList from './TodoList';
import TodoPopup from './TodoPopup';

const Todo = () => {
  const [view, setView] = useState(true);

  return (
    <section className="todo">
      <div className="container">
        <div className="wrapper">
          <div className="todo__head">
            <h1 className="todo__title">To-Do List</h1>

            <button
              className="todo__view-button"
              onClick={() => setView(!view)}
            >
              To {view ? 'completed' : 'incompleted'}
            </button>
          </div>

          <div className="todo__body">
            <TodoProvider>
              <TodoPopupProvider>
                <TodoList view={view} />
                <TodoPopup view={view} />
              </TodoPopupProvider>
            </TodoProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todo;
