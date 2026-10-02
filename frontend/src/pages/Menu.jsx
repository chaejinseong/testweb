import menu from "../data/menu.json";
import MenuList from "../components/MenuList.jsx";

export default function Menu() {
  return (
    <>
      <h1>메뉴</h1>
      {menu.map((c) => (
        <MenuList key={c.category} category={c.category} items={c.items} />
      ))}
    </>
  );
}
