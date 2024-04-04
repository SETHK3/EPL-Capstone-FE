export default function Home() {
  return (
    <div className="home-page page-container">
      <h1>English Premier League</h1>

      <div className="home-content-wrapper">
        <div className="home-grid">
          <div className="home-image">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YT7ERC4km5g?si=NKNgHJ7faZDJQtQZ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
