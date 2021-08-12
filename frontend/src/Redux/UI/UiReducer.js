import * as actionTypes from "./UiTypes";

const initialState = {
  sideOpen: false,
  sideDraw: false,
  darkTheme: null,
};

const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties,
  };
};

const openAnchor = (state, action) => {
return updateObject(state, { sideOpen: !state.sideOpen });
};

const drawOpen = (state, action) => {
return updateObject(state, { sideDraw: true });
};

const drawClose = (state, action) => {
return updateObject(state, { sideDraw: false });
};

const darkTheme = (state, action) => {
localStorage.setItem("darkTheme", JSON.stringify(action.darkTheme));
return updateObject(state, { darkTheme: action.darkTheme });
};


const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DARK_THEME:
      return darkTheme(state, action);

    case actionTypes.OPEN_SIDEBAR:
      return openAnchor(state, action);

    case actionTypes.DRAW_SIDEBAR_OPEN:
      return drawOpen(state, action);

    case actionTypes.DRAW_SIDEBAR_CLOSE:
      return drawClose(state, action);

    default:
      return state;
  }
};

export default uiReducer;  

