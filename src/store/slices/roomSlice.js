import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idRoomNew: "",
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addIdRoomNew(state, action) {
            state.idRoomNew = action.payload
        }
    },
    extraReducers: (builder) => {

    },
});

export const { addIdRoomNew } = roomSlice.actions


export default roomSlice.reducer;