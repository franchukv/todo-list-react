const Textarea = (props) => {
  const { className } = props;
  const classNames = ['textarea', className].join(' ');

  return <textarea {...props} className={classNames} />;
};

export default Textarea;
