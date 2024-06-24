function ChangeFontSize({ post, dispatch }) {
  return (
    <>
      <button
        className="mt-[0.2rem] pl-[0.55rem] pr-[0.2rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:!text-gray-700"
        onClick={() => {
          dispatch({
            type: "SET_FONT_SIZE",
            id: post.id,
            fontSize: post.fontSize * 1.25,
          });
        }}
      >
        A
      </button>
      <button
        className="mt-[0.2rem] pl-[0.2rem] pr-[0.45rem] text-[0.65rem] text-gray-500 transition-colors duration-300 hover:!text-gray-700"
        onClick={() => {
          dispatch({
            type: "SET_FONT_SIZE",
            id: post.id,
            fontSize: post.fontSize * 0.8,
          });
        }}
      >
        a
      </button>
    </>
  );
}

export default ChangeFontSize;
