import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./AuthProvider";
import { StateProvider } from "./StateProvider";
import RootNavigation from "./RootNavigation";

export default function Providers() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StateProvider>
          <RootNavigation />
        </StateProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
