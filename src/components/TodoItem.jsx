import { useState, useContext, useRef, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoPopupContext } from '../context/TodoPopupContext';
import ActionButton from './UI/ActionButton';

const TodoItem = ({ id, text, priority, completed }) => {
  const [classNames, setClassNames] = useState('todo__item');
  const { removeTodo, toggleTodo } = useContext(TodoContext);
  const { togglePopup } = useContext(TodoPopupContext);
  const todoItemElement = useRef(null);
  const todoTextElement = useRef(null);

  const handleCompressed = (item, text) => {
    const stylesToNumber = (styles) => Number(styles.replace('px', ''));

    if (item && text) {
      const styles = getComputedStyle(item);
      const sidePaddings =
        stylesToNumber(styles.paddingLeft) +
        stylesToNumber(styles.paddingRight);

      if (text.offsetWidth + sidePaddings === item.offsetWidth) {
        setClassNames(['todo__item', 'todo__item--compressed'].join(' '));
      } else {
        setClassNames('todo__item');
      }
    }
  };

  useEffect(() => {
    if (priority !== 'none') {
      handleCompressed(todoItemElement.current, todoTextElement.current);
    }
  }, [text]);

  return (
    <>
      <div
        ref={todoItemElement}
        className={`${classNames} ${completed && 'todo__item--completed'}`}
      >
        <div className="todo__content">
          <div ref={todoTextElement} className="todo__text">
            {text}
          </div>

          {priority !== 'none' && (
            <div className={`priority-legend priority-legend--${priority}`}>
              {priority}
            </div>
          )}
        </div>

        <div className="todo__actions">
          <ActionButton
            title={!completed ? 'Mark task as done' : 'Refresh task'}
            className={`action-button--${!completed ? 'check' : 'refresh'}`}
            onClick={() => toggleTodo(id)}
          />
          <ActionButton
            title="Edit task"
            className="action-button--edit"
            onClick={() => {
              togglePopup(false, id);
            }}
          />
          <ActionButton
            title="Remove task"
            className="action-button--remove"
            onClick={() => removeTodo(id)}
          />
        </div>
      </div>
    </>
  );
};

export default TodoItem;
