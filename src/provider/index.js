import React from "react";
import { AuthProvider } from "./AuthProvider";
import { StateProvider } from "./StateProvider";
import RootNavigation from "./RootNavigation";

export default function Providers() {
  return (
    <AuthProvider>
      <StateProvider>
        <RootNavigation />
      </StateProvider>
    </AuthProvider>
  );
}
