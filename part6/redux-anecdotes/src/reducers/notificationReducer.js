import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  warning: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    display(state, action) {
      return action.payload;
    },
    hide(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(display(content));
    setTimeout(() => {
      dispatch(hide());
    }, seconds * 1000);
  };
};

export const { hide, display } = notificationSlice.actions;
export default notificationSlice.reducer;
