import ChangeAlignment from "./ChangeAlignment";

function BottomContent({ post, dispatch }) {
  return (
    <div className="absolute bottom-[0.22rem] right-2 opacity-0 transition-all duration-200 hover:opacity-100">
      <ChangeAlignment post={post} dispatch={dispatch}></ChangeAlignment>
    </div>
  );
}

export default BottomContent;
