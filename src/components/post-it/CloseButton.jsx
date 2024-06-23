import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CloseButton({ post, dispatch }) {
  return (
    <button
      className="ml-auto text-sm text-gray-500"
      onClick={() => {
        dispatch({
          type: "DELETE_POST",
          id: post.id,
        });
      }}
    >
      <FontAwesomeIcon icon="fa-solid fa-xmark" />
    </button>
  );
}

export default CloseButton;
