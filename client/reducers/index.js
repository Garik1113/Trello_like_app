import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { errors } from "./errorReducers";
import { team } from "./teamReducers";
import { boards } from "./boardReducers";
import { list } from "./listReducers";
import { card } from "./cardReducers";
export default combineReducers({
  user: userReducer,
  errors,
  team,
  boards,
  list,
  card,
});
