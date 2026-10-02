export default function NewsList({ news }) {
  // 날짜가 YYYY-MM-DD 문자열이라 문자열 비교로 최신순 정렬된다.
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <ul className="news-list">
      {sorted.map((n) => (
        <li key={n.date + n.title}>
          <p className="news-meta">
            <span className="chip">{n.category}</span>
            <time dateTime={n.date}>{n.date.replaceAll("-", ".")}</time>
          </p>
          <h2>{n.title}</h2>
          <p className="muted">{n.body}</p>
        </li>
      ))}
    </ul>
  );
}
