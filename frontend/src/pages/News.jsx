import news from "../data/news.json";
import NewsList from "../components/NewsList.jsx";

export default function News() {
  return (
    <>
      <h1>소식</h1>
      <NewsList news={news} />
    </>
  );
}
