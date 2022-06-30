import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { IBook } from "../types";

interface BookState {
  books: IBook[];
  status: "loading" | "idle";
  error: string | null;
}

interface FetchBooksError {
  message: string;
}

const initialState: BookState = {
  books: [
    {
      id: 123,
      title: "string",
      img: "string",
      category: ["cat1", "cat2"],
      author: ["danya", "martin"],
    },
  ],
  status: "loading",
  error: null,
};

export const getBooks = createAsyncThunk<
  IBook[],
  number,
  { rejectValue: FetchBooksError }
>("getBooks/books", async (limit: number, thunkApi) => {
  const response = await axios.get(
    "https://www.googleapis.com/books/v1/favorites/109590416117896768352?parameters"
  );

  if (response.status !== 200) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: "Failed to fetch todos.",
    });
  }

  return response.data;
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state: { books: any }, action: { payload: any }) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    // When we send a request,
    // `fetchTodos.pending` is being fired:
    builder.addCase(getBooks.pending, (state, { payload }) => {
      state.status = "loading";
      state.error = null;
    });

    // When a server responses with the data,
    // `fetchTodos.fulfilled` is fired:
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      // and change `status` back to `idle`:
      state.books.push(...payload);
      state.status = "idle";
    });

    // When a server responses with an error:
    builder.addCase(getBooks.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const selectStatus = (state: RootState) => state.books.status;
export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;
