import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Tag } from "../../../shared/Interfaces";
import { createTag, getTags } from "../../Weekly/Services/tagService";

export interface IAnalytics {
  tags: Tag[];
}

const INITIAL_STATE: IAnalytics = {
  tags: [],
};

export const _getTags = createAsyncThunk(
  "analytics/getTags",
  (info: string) => {
    return getTags(info);
  }
);

export const _createTag = createAsyncThunk(
  "analytics/createTag",
  (info: Tag) => {
    return createTag(info);
  }
);

export const analyticSlice = createSlice({
  name: "analytics",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_getTags.fulfilled, (state: IAnalytics, action) => {
      state.tags = [...action.payload];
    });
    builder.addCase(_createTag.fulfilled, (state: IAnalytics, action) => {
      state.tags.push(action.payload);
    });
  },
});
