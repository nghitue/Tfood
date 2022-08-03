import { createSlice, createSelector } from '@reduxjs/toolkit';


const initialState = ({
    isShow: false,
    modalName: null,
});

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeStatusModal(state, action) {
            state.isShow = action.payload;
        },
        changeNameModal(state, action){
            state.modalName = action.payload;
        }
    },
});

export const { changeStatusModal, changeNameModal } = modalSlice.actions;

export const isShowSelector = (state) => state.modal.isShow;
export const modalNameSelector = (state) => state.modal.modalName;

export const toggleModal = createSelector(
    isShowSelector,
    modalNameSelector,
    (isShow, modalName) => {
        return {isShow: isShow,name: modalName};
    }
);

export default modalSlice.reducer;