import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../app/actions";
import Posts from "../components/posts";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_POSTS,
      posts: ["ramesh", "vashya"],
    });
  }, [dispatch]);

  console.log("jjjjjjjj", posts);

  return (
    <Fragment>
      <Posts />
    </Fragment>
  );
}
