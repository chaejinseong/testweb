import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "홈" },
  { to: "/menu", label: "메뉴" },
  { to: "/story", label: "가게 이야기" },
  { to: "/news", label: "소식" },
  { to: "/contact", label: "문의하기" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo" onClick={close}>
            느린오후 커피
          </Link>
          <button
            className="menu-button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        <nav className={open ? "nav open" : "nav"}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end onClick={close}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
