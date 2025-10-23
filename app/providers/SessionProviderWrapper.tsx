// app/providers/SessionProviderWrapper.tsx
"use client"; // এটা client component হিসেবে mark করতে হবে

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const SessionProviderWrapper = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
