import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../helpers/axiosClient";

const initialState = {
  isLoading: false,
  error: false,
  posts: [],
  requests: [],
  projects: [],
  users: [],
  post: null,
  recentPosts: [],
  userData: false,
  reports: [],
  hasMore: true,
  index: 0,
  step: 11,
};

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getProjectsSuccess(state, action) {
      state.isLoading = false;
      state.projects = action.payload;
    },

    getRequestsSuccess(state, action) {
      state.isLoading = false;
      state.requests = action.payload;
    },

    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    getUserDataSuccess(state, action) {
      state.isLoading = false;
      state.userData = action.payload;
    },

    // GET POST INFINITE
    getPostsInitial(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    getMorePosts(state) {
      const setIndex = state.index + state.step;
      state.index = setIndex;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET POST
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },

    getReportsSuccess(state, action) {
      state.isLoading = false;
      state.reports = action.payload;
    },

    // GET RECENT POST
    getRecentPostsSuccess(state, action) {
      state.isLoading = false;
      state.recentPosts = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getMorePosts } = slice.actions;

// ----------------------------------------------------------------------

export function getAllPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.get("/api/blog/posts/all");
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllRequests() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.get("admin/getall");
      dispatch(slice.actions.getRequestsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createProject(payload, checkFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.post("tasks/create", payload);
      checkFun(response);
      // dispatch(slice.actions.getRequestsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllProjects() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.get("tasks/getall");
      dispatch(slice.actions.getProjectsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteProjects(Id, checkFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.delete(`tasks/delete?taskId=${Id}`);
      checkFun(response);
      // dispatch(slice.actions.getProjectsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function signupUser(payload, cbFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.post(`admin/register`, payload);
      cbFun(response);
      // dispatch(slice.actions.getProjectsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function signinUser(payload, cbFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.post(`/admin/loginuser`, payload);
      cbFun(response);
      // dispatch(slice.actions.getProjectsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      cbFun(error);
    }
  };
}

export function getAllUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.get("admin/getall");
      dispatch(slice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(Id, checkFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.delete(`admin/delete?userId=${Id}`);
      checkFun(response);
      // dispatch(slice.actions.getProjectsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserData(Id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.get(`admin/profile/${Id}`);
      // checkFun(response);
      dispatch(slice.actions.getUserDataSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function assignTasktoUser(userId, payload, checkFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.put(
        `admin/profile/update/${userId}`,
        payload
      );
      checkFun(response);
      //   dispatch(slice.actions.getUserDataSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function ChangeTaskStatus(taskId, payload, checkFun) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.put(
        `/tasks/update?taskId=${taskId}`,
        payload
      );
      checkFun(response);
      //   dispatch(slice.actions.getUserDataSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getReports(type) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosClient.get(
        type ? `tasks/getreports?type=${type}` : "tasks/getreports"
      );
      dispatch(slice.actions.getReportsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
