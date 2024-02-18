import { getProfileApi } from "../../apis/user/getProfileApi";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const doGetProfile = createAsyncThunk('user/doGetProfile', async () => {
    const rs = await getProfileApi();
    return rs;
}
);

const initialState = {
    info: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // get profile
        builder.addCase(doGetProfile.pending, (state, _) => {
            state.info = null;
        });
        builder.addCase(doGetProfile.fulfilled, (state, action) => {
            state.info = action.payload.data;
        });
        builder.addCase(doGetProfile.rejected, (state, _) => {
            state.info = null;
        })

    },
});

export default userSlice.reducer;