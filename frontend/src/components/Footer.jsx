import store from "../data/store.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="logo">{store.name}</p>
        {store.hours.map((h) => (
          <p key={h.day}>
            {h.day} {h.time}
          </p>
        ))}
        <p>{store.address}</p>
        <p>{store.phone}</p>
      </div>
    </footer>
  );
}
