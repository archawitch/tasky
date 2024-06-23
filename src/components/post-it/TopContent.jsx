import ChangePostColor from "./ChangePostColor";
import ChangeFontSize from "./ChangeFontSize";
import CloseButton from "./CloseButton";

function TopContent({ post, dispatch }) {
  return (
    <div className="mb-2 flex w-full items-center">
      <ChangePostColor post={post} dispatch={dispatch}></ChangePostColor>
      <ChangeFontSize post={post} dispatch={dispatch}></ChangeFontSize>
      <div className="flex flex-grow"></div>
      <CloseButton post={post} dispatch={dispatch}></CloseButton>
    </div>
  );
}

export default TopContent;
