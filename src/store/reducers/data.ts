import * as actions from "../actions";

const initialState: any = {
  data: null,
};

const dataReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case actions.DATA_REQUEST: {
      return { ...initialState };
    }
    case actions.DATA_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default dataReducer;
