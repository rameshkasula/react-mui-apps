import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../app/slices/product";
import Posts from "../components/posts";

export default function Home() {
  const dispatch = useDispatch();
  // const { isLoading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Posts />
    </Fragment>
  );
}
