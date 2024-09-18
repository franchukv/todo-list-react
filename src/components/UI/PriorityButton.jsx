const PriorityButton = (props) => {
  const { value, priority } = props;
  const id = `priority_${value}`;

  return (
    <label htmlFor={id} className="priority-button">
      <input
        type="radio"
        name="priority"
        id={id}
        className="priority-button__input"
        value={value}
        checked={priority === value}
        {...props}
      />
      <span className="priority-button__title">{value}</span>
    </label>
  );
};

export default PriorityButton;
