import React from "react";

import { Provider } from "react-redux";

import { store } from "./store";
import Main from "./Main";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Main />
      </NativeBaseProvider>
    </Provider>
  );
}
