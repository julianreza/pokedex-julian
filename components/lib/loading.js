import React from "react";
import _isEmpty from 'lodash/isEmpty'

const LoadIndicator = ({ source }) => (
  <div className={`flex w-full justify-center items-center ${_isEmpty(source) && "h-screen"}`}>
    <img src='/pokemon.png' className="h-10 w-10 animate-spin" />
  </div>
)

export default LoadIndicator