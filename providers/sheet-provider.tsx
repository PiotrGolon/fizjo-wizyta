"use client";

import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return;

  return <div>SheetProvider</div>;
};

export default SheetProvider;
