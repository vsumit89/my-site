import { useState } from "react";
import signLogo from "../../images/signature.png";
import "./navbar.css";

export function Navbar() {
  const [selectedLink, setSelectedLink] = useState(0);

  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Project",
      url: "/blog",
    },
    {
      name: "Tools",
      url: "/contact",
    },
  ];

  const styles = {
    selected: {
      color: "black",
      backgroundColor: "#f6f6f6",
      fontWeight: "bold",
    },
    notSelected: {
      color: "#6c6c6c",
      backgroundColor: "white",
      fontWeight: "normal",
    },
  };

  return (
    <>
      <div className="navbar-container">
        <div className="img-container">
          <img src={signLogo} />
        </div>

        <ul>
          {links.map(({ name, url }, index) => (
            <li
              style={{
                backgroundColor:
                  selectedLink === index && styles.selected.backgroundColor,
              }}
              onClick={() => setSelectedLink(index)}
            >
              <a
                href={url}
                style={{
                  color:
                    selectedLink === index
                      ? styles.selected.color
                      : styles.notSelected.color,
                  fontWeight:
                    selectedLink === index
                      ? styles.selected.fontWeight
                      : styles.notSelected.fontWeight,
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
