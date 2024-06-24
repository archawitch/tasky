import { getPostColor } from "../../context/PostContext";

function ChangePostColor({ post, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({
          type: "CHANGE_COLOR",
          id: post.id,
        });
      }}
      style={{
        width: "0.85rem",
        height: "0.85rem",
        borderRadius: "100%",
        border: "1px solid gray",
        backgroundColor: getPostColor(post.nextBackgroundColor),
      }}
      className="m-0 p-0"
    ></button>
  );
}

export default ChangePostColor;
