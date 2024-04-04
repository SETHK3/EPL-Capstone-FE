import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    const footer = document.getElementById("footer");

    function atBottom() {
      return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }

    function toggleFooter() {
      if (atBottom()) {
        footer.style.bottom = "0";
      } else {
        footer.style.bottom = "-50px";
      }
    }

    window.addEventListener("scroll", toggleFooter);

    return () => {
      window.addEventListener("scroll", toggleFooter);
    };
  }, []);

  return (
    <div className="footer-container" id="footer">
      <div className="footer-wrapper">
        <div className="footer-links">
          <p>
            St. George's Park, Newborough Road, Needwood, Burton-Upon-Trent,
            DE13 9PD
          </p>
          <p>The EPL Association &copy; 1992-2024 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
