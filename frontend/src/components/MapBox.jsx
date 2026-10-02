// 외부 지도 API 대신 예시 위치 사진 + 지도 앱 링크 (SPEC 3절)
export default function MapBox({ store }) {
  return (
    <div className="mapbox">
      <img src={store.locationImage} alt={`${store.name} 가는 길 예시 사진`} loading="lazy" />
      <div>
        <p>{store.address}</p>
        <p>
          <a href={store.mapUrl} target="_blank" rel="noreferrer">
            지도 앱에서 열기 →
          </a>
        </p>
        <p>
          전화 <a href={`tel:${store.phone}`}>{store.phone}</a>
        </p>
        <p>
          인스타그램{" "}
          <a href={store.instagram} target="_blank" rel="noreferrer">
            {store.instagramHandle}
          </a>
        </p>
      </div>
    </div>
  );
}
