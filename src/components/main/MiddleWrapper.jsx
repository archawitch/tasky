import OpenTodoButton from "../todo/OpenTodoButton";
import AddPostButton from "../post-it/AddPostButton";

function MiddleWrapper({ isTodoVisible, openTodoList }) {
  return (
    <div className="hidden items-center justify-between md:flex">
      <AddPostButton></AddPostButton>
      <div>
        {!isTodoVisible && (
          <OpenTodoButton openTodoList={openTodoList}></OpenTodoButton>
        )}
      </div>
    </div>
  );
}

export default MiddleWrapper;
