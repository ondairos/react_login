import { createSlice } from "@reduxjs/toolkit";
import { FormData } from "../../components/AddressForm/AddressFormTypes";

const initialState: Partial<FormData> = {
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  state: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.country = action.payload.country;
      state.state = action.payload.state;
    },
  },
});

export const { saveUserData } = userSlice.actions;

export default userSlice.reducer;
