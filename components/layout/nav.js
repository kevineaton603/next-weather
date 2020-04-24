import Link from "next/link";
import { Menu, Button } from "semantic-ui-react";
import { useContext, useState } from "react";
import { UnitContext } from "../providers/unit";

/**
 *
 * @type {React.FC<React.PropsWithChildren<{active: string}>>}
 */
const Nav = ({ children, active }) => {
  const { unitState } = useContext(UnitContext);
  const [unit, setUnit] = unitState;
  return (
    <Menu pointing>
      <Menu.Item active={active === "Home"}>
        <Link prefetch href="/">
          <a style={{ color: "inherit" }}>My Weather App</a>
        </Link>
      </Menu.Item>
      <Menu.Item active={active === "About"}>
        <Link prefetch href="/about">
          <a style={{ color: "inherit" }}>About</a>
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Button.Group>
          <Button positive={unit === "F"} onClick={() => setUnit("F")}>
            &deg;F
          </Button>
          <Button positive={unit === "C"} onClick={() => setUnit("C")}>
            &deg;C
          </Button>
        </Button.Group>
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
