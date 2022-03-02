const SelectButton = ({ children, onClick }) => {
  return (
  <button onClick={onClick} className=" text-white bg-blue-500 border-0 my-8 mx-2 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded">{children}</button>
  )
};

export default SelectButton;
