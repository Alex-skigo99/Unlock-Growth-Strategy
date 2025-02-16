import React from "react";
import MySubComp1 from "./mySubComponent/MySubComp1";
import MySubComp2 from "./mySubComponent/MySubComp2";

const MyComponent = () => {
  return (
    <div>
      <MySubComp1 />
      <MySubComp2 />
    </div>
  );
};

export default MyComponent;
