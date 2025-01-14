import { render, screen } from "@testing-library/react";
import { ProfileDropdown } from "../../components/Dropdown";

import profilePic from "../../../public/profile-pic.png";

describe("Profile Dropdown", () => {
    test("renders", async () => {
        const component = <ProfileDropdown user={{ username: "test" }} pic={profilePic} />;
        render(component);
        expect(component).toBeInTheDocument();
    })
})