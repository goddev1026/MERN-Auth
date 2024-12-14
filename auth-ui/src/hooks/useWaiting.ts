import { useState } from "react";

type T = (initialValue?: boolean) => [boolean, () => void, () => void];

export const useWaiting: T = (initialValue = false) => {
  const [isWaiting, setWaiting] = useState<boolean>(initialValue);
  return [isWaiting, () => setWaiting(true), () => setWaiting(false)];
};
