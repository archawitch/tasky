import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OpenTodoButton({ isVisible, openTodoList }) {
  return (
    <>
      <button onClick={openTodoList}>
        <FontAwesomeIcon className="z-50 text-2xl" icon="fa-solid fa-list-ol" />
      </button>
    </>
  );
}

export default OpenTodoButton;
