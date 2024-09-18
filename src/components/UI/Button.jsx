const Button = (props) => {
  const { type = 'button', className, children = '' } = props;
  const classNames = ['button', className].join(' ');

  return (
    <button {...props} type={type} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
