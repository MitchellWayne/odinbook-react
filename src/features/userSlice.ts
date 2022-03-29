import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   user: {
//     _id: string;
//     firstname: string;
//     lastname: string;
//     username: string;
//     about: string;
//     pfpURL: string;
//     posts: string[];
//     friends: string[];
//     requests: string[];
//     requested: string[];
//   }
// }

const initialState = {
  // user: {
  //   _id: '',
  //   firstname: '',
  //   lastname: '',
  //   username: '',
  //   about: '',
  //   pfpURL: '',
  //   posts: [],
  //   friends: [],
  //   requests: [],
  //   requested: [],
  // }
  user: {}
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    }
  },
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;