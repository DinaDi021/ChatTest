import { useState } from "react";

const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const change = () => {
    setValue((prev) => !prev);
  };

  return { value, change };
};

export { useToggle };
