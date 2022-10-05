// components/layout.js

import { WithSubnavigation } from "./navbar";
import { LargeWithLogoCentered } from "./footer";

export function Layout({ children }: { children: any}) {
  return (
    <>
      <main>{children}</main>
      <LargeWithLogoCentered />
    </>
  );
}
