import { filterMenuTreeOptions, transformData, transformParentData } from '@/Utils/helper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    treeData: [],
    allMenus: [],
    expandIt: true,
    selectedMenu: { id: "", name: "", depth: "", parent: "" },
    formState: { id: "", name: "", depth: "", parent: "" },
    parentSelectionData: [],
    isLoading: false,
    isDeleteLoading: false,
    isMutateLoading: false,
    currentParentMenuId: null,
    error: { name: "" }
};

export const fetchMenus = createAsyncThunk(
    'menu/fetchMenus',
    async (parent_id = null) => {
        const queryParams = new URLSearchParams();
        if (parent_id) {
            queryParams.append("parent_id", parent_id);
        }
        const response = await fetch(`/api/menus?${queryParams.toString()}`);
        const data = await response.json();
        return transformData(data);
    }
);

export const fetchAllMenuOptions = createAsyncThunk(
    'menu/fetchAllMenuOptions',
    async () => {
        const response = await fetch('/api/menus');
        const data = await response.json();
        return filterMenuTreeOptions(data);
    }
);

export const fetchParentMenus = createAsyncThunk(
    'menu/fetchParentMenus',
    async (id) => {
        const response = await fetch(`/api/menus/${id}/available-parents`);
        const data = await response.json();
        return transformParentData(data);
    }
);

export const deleteMenu = createAsyncThunk(
    'menu/deleteMenu',
    async (id) => {
        await fetch(`/api/menus/${id}`, { method: 'DELETE' });
        return id;
    }
);

export const updateMenu = createAsyncThunk(
    'menu/updateMenu',
    async ({ id, title, parent_id }) => {
        const response = await fetch(`/api/menus/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, parent_id: parent_id || null }),
        });
        return response.json();
    }
);

export const createMenu = createAsyncThunk(
    'menu/createMenu',
    async ({ title, parent_id }) => {
        const response = await fetch('/api/menus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, parent_id: parent_id || null }),
        });
        return response.json();
    }
);

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setExpandIt: (state, action) => {
            state.expandIt = action.payload;
        },
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
            if (action.payload.isEdit) {
                state.formState = action.payload;
            } else if (!action.payload || !action.payload.isEdit) {
                state.formState = initialState.formState;
            }
        },
        setFormState: (state, action) => {
            state.formState = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCurrentParentMenuId: (state, action) => {
            state.currentParentMenuId = action.payload;
        },
        resetState: (state) => {
            state.selectedMenu = initialState.selectedMenu;
            state.formState = initialState.formState;
            state.error = initialState.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMenus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.treeData = action.payload;
            })
            .addCase(fetchMenus.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchAllMenuOptions.fulfilled, (state, action) => {
                state.allMenus = action.payload;
            })
            .addCase(fetchParentMenus.pending, (state) => {
                state.isMutateLoading = true;
            })
            .addCase(fetchParentMenus.fulfilled, (state, action) => {
                state.isMutateLoading = false;
                state.parentSelectionData = action.payload;
            })
            .addCase(deleteMenu.pending, (state) => {
                state.isDeleteLoading = true;
            })
            .addCase(deleteMenu.fulfilled, (state) => {
                state.isDeleteLoading = false;
                state.selectedMenu = initialState.selectedMenu;
            })
            .addCase(createMenu.pending, (state) => {
                state.isMutateLoading = true;
            })
            .addCase(createMenu.fulfilled, (state) => {
                state.isMutateLoading = false;
            })
            .addCase(createMenu.rejected, (state) => {
                state.isMutateLoading = false;
            })
            .addCase(updateMenu.pending, (state) => {
                state.isMutateLoading = true;
            })
            .addCase(updateMenu.fulfilled, (state) => {
                state.isMutateLoading = false;
            })
            .addCase(updateMenu.rejected, (state) => {
                state.isMutateLoading = false;
            });
    },
});

export const {
    setExpandIt,
    setSelectedMenu,
    setFormState,
    setError,
    setCurrentParentMenuId,
    resetState
} = menuSlice.actions;

export default menuSlice.reducer;