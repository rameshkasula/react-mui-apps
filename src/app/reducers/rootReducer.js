import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// slices
import userReducer from "./userReducer";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
});

export { rootPersistConfig, rootReducer };
