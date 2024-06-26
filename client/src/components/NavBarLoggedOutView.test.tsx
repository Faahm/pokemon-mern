import { screen, render, fireEvent } from "@testing-library/react";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

describe("NavBarLoggedOutView Component", () => {
  it("renders correctly", () => {
    const onRegisterClicked = jest.fn();
    const onLoginClicked = jest.fn();

    const { getByText } = render(
      <NavBarLoggedOutView
        onRegisterClicked={onRegisterClicked}
        onLoginClicked={onLoginClicked}
      />
    );

    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("calls correct callbacks on button click", () => {
    const onRegisterClicked = jest.fn();
    const onLoginClicked = jest.fn();

    const { getByText } = render(
      <NavBarLoggedOutView
        onRegisterClicked={onRegisterClicked}
        onLoginClicked={onLoginClicked}
      />
    );

    fireEvent.click(screen.getByText("Register"));
    fireEvent.click(screen.getByText("Login"));

    expect(onRegisterClicked).toHaveBeenCalledTimes(1);
    expect(onLoginClicked).toHaveBeenCalledTimes(1);
  });
});
