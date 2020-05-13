import axios from "axios";

export const inviteMembers = (email) => (dispatch, getState) => {
  axios.post("/members/invite", { email }, tokenConfig(getState)).then();
};
