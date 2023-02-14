import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/user";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  // blog: blogReducer,
  user: userReducer,
  // product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
