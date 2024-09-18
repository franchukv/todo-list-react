import { createContext, useState } from 'react';

const TodoPopupContext = createContext();

const TodoPopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    visible: false,
    isAddMode: true,
    todoId: null,
  });

  const togglePopup = (isAddMode = true, todoId = null) => {
    setPopup({
      ...popup,
      visible: !popup.visible,
      isAddMode,
      todoId,
    });
  };

  return (
    <TodoPopupContext.Provider value={{ popup, togglePopup }}>
      {children}
    </TodoPopupContext.Provider>
  );
};

export { TodoPopupContext, TodoPopupProvider };
