const ActionButton = (props) => {
  const { type = 'button', className, children } = props;
  const classNames = ['action-button', className].join(' ');

  return (
    <button {...props} type={type} className={classNames}>
      {children}
    </button>
  );
};

export default ActionButton;
