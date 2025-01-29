import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 ">
      <h1 className="text-xl border-b pb-2 mx-5">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
