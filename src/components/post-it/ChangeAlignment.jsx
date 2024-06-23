import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChangeAlignment({ post, dispatch }) {
  return (
    <>
      <button
        className="mt-[0.2rem] px-[0.33rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
        onClick={() => {
          dispatch({
            type: "SET_ALIGNMENT",
            id: post.id,
            align: "left",
          });
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-align-left" />
      </button>
      <button
        className="mt-[0.2rem] px-[0.33rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
        onClick={() => {
          dispatch({
            type: "SET_ALIGNMENT",
            id: post.id,
            align: "center",
          });
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-align-center" />
      </button>
      <button
        className="mt-[0.2rem] px-[0.33rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:text-gray-700"
        onClick={() => {
          dispatch({
            type: "SET_ALIGNMENT",
            id: post.id,
            align: "right",
          });
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-align-right" />
      </button>
    </>
  );
}

export default ChangeAlignment;
