import { configureStore } from "@reduxjs/toolkit";
import authslice from "./AuthSlice";
import inboxslice from "./InboxSlice";
import sentboxslice from "./Sentboxslice";

const store = configureStore({
    reducer:{auth:authslice.reducer,sent:sentboxslice.reducer,in:inboxslice.reducer}
})

export default store