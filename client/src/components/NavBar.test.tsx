// NavBar.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

interface User {
  username: string;
  email: string;
}

describe("NavBar Component", () => {
  const loggedInUser: User = {
    username: "testuser",
    email: "testuser@example.com",
  };

  it("renders correctly when user is logged in", () => {
    const onRegisterClicked = jest.fn();
    const onLoginClicked = jest.fn();
    const onLogoutSuccessful = jest.fn();

    const { getByText } = render(
      <NavBar
        loggedInUser={loggedInUser}
        onRegisterClicked={onRegisterClicked}
        onLoginClicked={onLoginClicked}
        onLogoutSuccessful={onLogoutSuccessful}
      />
    );

    expect(screen.getByText("Pokemon MERN")).toBeInTheDocument();
    expect(screen.getByText("Signed in as testuser")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders correctly when no user is logged in", () => {
    const onRegisterClicked = jest.fn();
    const onLoginClicked = jest.fn();
    const onLogoutSuccessful = jest.fn();

    const { getByText } = render(
      <NavBar
        loggedInUser={null}
        onRegisterClicked={onRegisterClicked}
        onLoginClicked={onLoginClicked}
        onLogoutSuccessful={onLogoutSuccessful}
      />
    );

    expect(screen.getByText("Pokemon MERN")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
