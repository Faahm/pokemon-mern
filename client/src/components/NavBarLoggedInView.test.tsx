import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import NavBarLoggedInView from "./NavBarLoggedInView";

jest.mock("../api/users_api", () => ({
  logout: jest.fn().mockResolvedValue(undefined),
}));

interface User {
  username: string;
  email: string;
}

describe("NavBarLoggedInView Component", () => {
  const user: User = {
    username: "testuser",
    email: "testuser@example.com",
  };

  it("renders user information correctly", () => {
    const onLogoutSuccessful = jest.fn();

    const { getByText } = render(
      <NavBarLoggedInView user={user} onLogoutSuccessful={onLogoutSuccessful} />
    );

    expect(
      screen.getByText(`Signed in as ${user.username}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls logout function and onLogoutSuccessful callback on button click", async () => {
    const onLogoutSuccessful = jest.fn();

    const { getByText } = render(
      <NavBarLoggedInView user={user} onLogoutSuccessful={onLogoutSuccessful} />
    );

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(onLogoutSuccessful).toHaveBeenCalledTimes(1);
    });
  });
});
