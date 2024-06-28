import { createContext, useContext, useReducer, useEffect } from "react";

const GroupContext = createContext(null);
const GroupDispatchContext = createContext(null);
const initialGroups = (() => {
  const savedGroups = localStorage.getItem("groups");
  if (savedGroups) {
    return JSON.parse(savedGroups);
  } else {
    return { currentGroup: 0, groups: [0] };
  }
})();

function groupReducer(postGroups, action) {
  switch (action.type) {
    case "SET_CURRENT_GROUP":
      return {
        ...postGroups,
        currentGroup: action.groupId,
      };
    case "ADD_GROUP":
      const newGroup = postGroups.groups.length;
      return {
        ...postGroups,
        currentGroup: newGroup,
        groups: [...postGroups.groups, newGroup],
      };
    case "DELETE_GROUP":
      if (postGroups.groups.length <= 1) {
        return postGroups;
      } else {
        const updatedGroups = postGroups.groups
          .filter((group) => group !== postGroups.currentGroup)
          .map((group, index) => index);

        // if the deletedGroup is the last one, update currentGroup
        const updatedCurrentGroup =
          postGroups.currentGroup === postGroups.groups.length - 1
            ? postGroups.currentGroup - 1
            : postGroups.currentGroup;

        return {
          ...postGroups,
          currentGroup: updatedCurrentGroup,
          groups: updatedGroups,
        };
      }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function useGroup() {
  return useContext(GroupContext);
}

export function useDispatchGroup() {
  return useContext(GroupDispatchContext);
}

export function GroupProvider({ children }) {
  const [groups, dispatch] = useReducer(groupReducer, initialGroups);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  return (
    <GroupContext.Provider value={groups}>
      <GroupDispatchContext.Provider value={dispatch}>
        {children}
      </GroupDispatchContext.Provider>
    </GroupContext.Provider>
  );
}
