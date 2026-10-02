export default function MenuList({ category, items }) {
  return (
    <section className="section">
      <h2>{category}</h2>
      <ul className="menu-list">
        {items.map((item) => (
          <li key={item.name}>
            <div>
              <p className="menu-name">{item.name}</p>
              <p className="muted">{item.description}</p>
            </div>
            <p className="menu-price">{item.price.toLocaleString("ko-KR")}원</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
