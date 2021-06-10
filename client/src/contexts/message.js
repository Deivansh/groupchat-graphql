import { React, createContext, useReducer, useContext } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();
const messageReducer = (state, action) => {
	let groupsCopy, groupIndex;
	const { groupId, messages, message } = action.payload;
	switch (action.type) {
		case "SET_GROUPS":
			return { ...state, groups: action.payload };
		case "SET_GROUP_MESSAGES":
			groupsCopy = [...state.groups];
			groupIndex = groupsCopy.findIndex((group) => group._id === groupId);
			groupsCopy[groupIndex] = { ...groupsCopy[groupIndex], messages };
			return {
				...state,
				groups: groupsCopy,
			};
		case "SET_SELECTED_GROUP":
			groupsCopy = state.groups.map((group) => ({
				...group,
				selected: group._id === action.payload,
			}));
			return { ...state, groups: groupsCopy };
		case "ADD_MESSAGE":
			groupsCopy = [...state.groups];
			groupIndex = groupsCopy.findIndex((group) => group._id === groupId);
			if (groupIndex && groupIndex >= 0) {
				let prevGroupMessages = groupsCopy[groupIndex].messages
					? groupsCopy[groupIndex].messages
					: [];
				groupsCopy[groupIndex] = {
					...groupsCopy[groupIndex],
					messages: [message, ...prevGroupMessages],
				};
				return { ...state, groups: groupsCopy };
			}
			return { ...state, groups: groupsCopy };
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};
export const MessageProvider = ({ children }) => {
	const [state, dispatch] = useReducer(messageReducer, { groups: null });
	return (
		<MessageDispatchContext.Provider value={dispatch}>
			<MessageStateContext.Provider value={state}>
				{children}
			</MessageStateContext.Provider>
		</MessageDispatchContext.Provider>
	);
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
