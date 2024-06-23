import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGroup, useDispatchGroup } from "../../context/GroupOfPostContext";
import { useState } from "react";
import { useDispatchPosts } from "../../context/PostContext";

function GroupBar() {
  const [isHovered, setIsHovered] = useState(false);
  const groups = useGroup();
  const groupsItems = groups.groups;
  const dispatchGroup = useDispatchGroup();
  const dispatchPosts = useDispatchPosts();

  return (
    <div className="absolute bottom-10 flex w-full items-center justify-center">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          opacity: isHovered ? "1" : "0",
          transitionDelay: isHovered ? null : "1000ms",
        }}
        className="flex items-center justify-center transition-opacity duration-200"
      >
        {groupsItems &&
          groupsItems.length > 0 &&
          groupsItems.map((group) => {
            return (
              <GroupItem
                key={group}
                currentGroup={groups.currentGroup}
                group={group}
                dispatch={dispatchGroup}
              ></GroupItem>
            );
          })}
        {groupsItems.length < 10 && (
          <AddGroupButton dispatch={dispatchGroup}></AddGroupButton>
        )}
        {groupsItems.length > 1 && (
          <DeleteGroupButton
            dispatchGroup={dispatchGroup}
            dispatchPosts={dispatchPosts}
          ></DeleteGroupButton>
        )}
      </div>
    </div>
  );
}

function GroupItem({ group }) {
  const [isHovered, setIsHovered] = useState(false);
  const groups = useGroup();
  const dispatch = useDispatchGroup();

  return (
    <button
      key={group}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        event.target.blur();
        dispatch({
          type: "SET_CURRENT_GROUP",
          groupId: group,
        });
      }}
      className="flex w-[1.5rem] flex-col justify-center px-2 py-1"
    >
      {group === groups.currentGroup || isHovered ? (
        group + 1
      ) : (
        <span className="text-[0.25rem] text-neutral-300">
          <FontAwesomeIcon icon="fa-solid fa-circle" />
        </span>
      )}
    </button>
  );
}

function AddGroupButton() {
  const dispatch = useDispatchGroup();

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        event.target.blur();
        dispatch({
          type: "ADD_GROUP",
        });
      }}
      className="transition-color px-2 py-1 text-xs text-neutral-200 hover:text-white"
    >
      <FontAwesomeIcon icon="fa-solid fa-plus" />
    </button>
  );
}

function DeleteGroupButton() {
  const groups = useGroup();
  const dispatchGroup = useDispatchGroup();
  const dispatchPosts = useDispatchPosts();

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        event.target.blur();
        dispatchPosts({
          type: "DELETE_POST_IN_GROUP",
          deletedGroup: groups.currentGroup,
        });
        dispatchGroup({
          type: "DELETE_GROUP",
        });
      }}
      style={{
        paddingLeft: groups.groups.length === 10 ? "1rem" : null,
      }}
      className="transition-color px-2 py-1 text-xs text-neutral-200 hover:text-white"
    >
      <FontAwesomeIcon icon="fa-solid fa-trash" />
    </button>
  );
}

export default GroupBar;
