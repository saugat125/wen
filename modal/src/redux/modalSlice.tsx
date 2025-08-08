import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ModalState {
    title : string,
    content : string
}
interface ModalSliceState {
    confirmation: ModalState;
    alert: ModalState;
    form: ModalState;
    modalType: string;
    apiData : any | null;
    isLoading : boolean
}

const initialState: ModalSliceState = {
    confirmation: { title: 'Confirmation', content: 'Are you sure you want to continue?',},
    alert: { title: 'Alert', content: 'Here is the content of the alert' },
    form: { title: 'Form', content: 'Here is the content of the form' },
    modalType : '',
    apiData : null,
    isLoading : false
};

export const confirmAction = createAsyncThunk(
    'modal/confirm', async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            console.log('Response data: ', data);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const modalSlice = createSlice({
    name : "modal",
    initialState,
    reducers : {
        openModal : (state,action) =>{
            state.modalType = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(confirmAction.pending,(state) => {
            state.isLoading = true;
        })
        builder.addCase(confirmAction.fulfilled,(state,action) => {
            state.apiData = action.payload;
            state.isLoading = false;
        })
        builder.addCase(confirmAction.rejected,(state) => {
            console.log("Api fetch failed");
        })
    }
})

export default modalSlice.reducer;
export const {openModal} = modalSlice.actions;