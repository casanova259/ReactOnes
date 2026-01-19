import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const[value,setValue]=useState(function () {
    const storedValue = localStorage.getItem(key);
    //adding the item name same as it is used in the local storage key to store the data
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(function () {
    localStorage.setItem("watched", JSON.stringify(value))
  }, [value,key])

  return [value,setValue];
}
