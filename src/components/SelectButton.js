const SelectButton = ({ children, onClick }) => {
  return (
  <button onClick={onClick} class="flex ml-auto text-white bg-blue-500 border-0 my-8 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">{children}</button>
  )
};

export default SelectButton;
