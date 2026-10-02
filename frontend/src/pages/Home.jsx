import { Link } from "react-router-dom";
import store from "../data/store.json";
import menu from "../data/menu.json";
import HoursTable from "../components/HoursTable.jsx";
import MapBox from "../components/MapBox.jsx";

const featured = menu.flatMap((c) => c.items).filter((i) => i.featured);

export default function Home() {
  return (
    <>
      <section className="hero">
        <img src={store.heroImage} alt={`${store.name} 매장 내부`} />
        <h1>{store.name}</h1>
        <p className="muted">{store.tagline}</p>
      </section>

      <section className="section">
        <h2>대표 메뉴</h2>
        <ul className="card-grid">
          {featured.map((item) => (
            <li key={item.name}>
              <img src={item.image} alt={item.name} loading="lazy" />
              <p className="menu-name">{item.name}</p>
              <p className="muted">{item.price.toLocaleString("ko-KR")}원</p>
            </li>
          ))}
        </ul>
        <Link to="/menu" className="more">
          전체 메뉴 보기 →
        </Link>
      </section>

      <section className="section">
        <h2>영업시간</h2>
        <HoursTable hours={store.hours} />
      </section>

      <section className="section">
        <h2>오시는 길</h2>
        <MapBox store={store} />
      </section>
    </>
  );
}
