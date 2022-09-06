import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const SearchTitle = () => {
  const { title } = useParams();
  const [page, setPage] = useState(0);
const dispatch = useDispatch();

  useEffect(() => {
    const search = async () => {};
  });

  return;
};

export default SearchTitle;
