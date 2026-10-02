import story from "../data/story.json";

export default function Story() {
  return (
    <>
      <h1>가게 이야기</h1>
      {[story.owner, story.beans].map((s) => (
        <section key={s.title} className="section story">
          <img src={s.image} alt={s.title} loading="lazy" />
          <div>
            <h2>{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
