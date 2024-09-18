import { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoPopupContext } from '../context/TodoPopupContext';
import Textarea from './UI/Textarea';
import PriorityButton from './UI/PriorityButton';
import Button from './UI/Button';

const TodoPopup = ({ view }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('none');
  const { todos, addTodo, editTodo } = useContext(TodoContext);
  const { popup, togglePopup } = useContext(TodoPopupContext);

  useEffect(() => {
    if (popup.todoId) {
      const currentTodo = todos.filter((todo) => todo.id === popup.todoId)[0];
      setText(currentTodo.text);
      setPriority(currentTodo.priority);
    } else {
      resetForm();
    }
  }, [popup.todoId]);

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const resetForm = () => {
    setText('');
    setPriority('none');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (popup.isAddMode) {
      addTodo({ text, priority });
    } else {
      editTodo(popup.todoId, text, priority);
    }

    togglePopup();
    resetForm();
  };

  return (
    <>
      {view && (
        <button
          title="Add task"
          className="todo__add-button"
          onClick={() => togglePopup()}
        />
      )}

      <div className={`todo-popup ${popup.visible && 'active'}`}>
        <div className="todo-popup__container">
          <div className="todo-popup__wrapper">
            <button
              className="todo-popup__close-button"
              onClick={() => togglePopup()}
            />

            <form className="todo-popup__form" onSubmit={handleSubmit}>
              <Textarea
                placeholder="Write your task here..."
                value={text}
                onChange={handleText}
              />

              <div className="todo-popup__priorities">
                <h6 className="todo-popup__subtitle">Select priority</h6>

                <PriorityButton
                  value="high"
                  priority={priority}
                  onChange={handlePriority}
                />
                <PriorityButton
                  value="medium"
                  priority={priority}
                  onChange={handlePriority}
                />
                <PriorityButton
                  value="low"
                  priority={priority}
                  onChange={handlePriority}
                />
                <PriorityButton
                  value="none"
                  priority={priority}
                  onChange={handlePriority}
                />
              </div>

              <Button type="submit" disabled={text.length === 0 ? true : false}>
                {popup.isAddMode ? 'Add todo' : 'Save changes'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPopup;
