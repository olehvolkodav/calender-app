import axios from "axios";

export const DATA_REQUEST = "DATA_REQUEST";
export const DATA_SUCCESS = "DATA_SUCCESS";

export function getData() {
  return async (dispatch: any) => {
    dispatch({ type: DATA_REQUEST });

    const event = await axios.get("/api/data");

    dispatch({
      type: DATA_SUCCESS,
      payload: event.data,
    });
  };
}
