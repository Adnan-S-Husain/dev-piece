"use client";

import { NavStatusProvider } from "@/context/navstatus/navstatus.context";
import { WidthContext } from "@/context/screenwidth/screenwidth.context";
import { useContext } from "react";
import { FollowerProvider, UpdateFollower } from "react-mouse-follower";

export default function Sublayout({ children }: { children: React.ReactNode }) {
  const { screenwidth } = useContext(WidthContext);
  return (
    <FollowerProvider visible={screenwidth > 640}>
      <UpdateFollower
        mouseOptions={{
          zIndex: 2,
        }}
      >
        <NavStatusProvider>{children}</NavStatusProvider>
      </UpdateFollower>
    </FollowerProvider>
  );
}
