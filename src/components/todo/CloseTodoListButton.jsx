import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CloseTodoListButton({ closeTodoList }) {
  return (
    <button
      onClick={closeTodoList}
      className="absolute left-[0.4rem] top-[0.2rem] text-lg"
    >
      <FontAwesomeIcon icon="fa-solid fa-caret-right" />
    </button>
  );
}

export default CloseTodoListButton;
