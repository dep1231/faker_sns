import * as React from "react";
import { Provider } from "react-redux";
import App from "../App";
import { store } from "../redux/store/store";
import { render, screen } from "@testing-library/react";
test("first render", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("-")).toBeInTheDocument();
});
