import { useState, useCallback } from "react";

type Touched = { [k: string]: boolean };
type BlurHandler = React.FocusEventHandler<HTMLInputElement>;
type T = () => [Touched, BlurHandler];

export const useTouched: T = () => {
  const [touched, setTouched] = useState<Touched>({});

  const handleBlur = useCallback<BlurHandler>(({ target: { name } }) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  return [touched, handleBlur];
};
