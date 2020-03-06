import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(1)}>
      This is an app! oh really? count is at: {count}!232323
    </div>
  );
};

export default App;
