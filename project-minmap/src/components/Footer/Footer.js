"use client";
import "./footer.scss";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="box">
            <h3>Features</h3>
            <a href="#">Cool stuff</a>
            <a href="#">Random feature</a>
            <a href="#">Stuff for developers</a>
            <a href="#">Another one</a>
            <a href="#">Last time</a>
          </div>
          <div className="box">
            <h3>Resources</h3>
            <a href="#home">Resource</a>
            <a href="#book">Resource name</a>
            <a href="#packages">Ưu Đãi</a>
            <a href="#services">Another resource</a>
            <a href="#gallery">Final resource</a>
          </div>
          <div className="box">
            <h3>About</h3>
            <a href="#">Team</a>
            <a href="#">Locations</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div className="box">
            <h3>Help</h3>
            <a href="#">Support</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="box">
            <h3>Stay connected</h3>
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="box">
            <h3>FWR</h3>
          </div>
          <div className="box">
            <h3>Address</h3>
            <ul>
              <li>123 6th St.</li>
              <li>Melboume, FL 32904</li>
            </ul>
          </div>
          <div className="box">
            <h3>Free Resources</h3>
            <ul>
              <li>
                Use our HTML blocks for <span>FREE</span>
              </li>
              <li>All are MIT License</li>
            </ul>
          </div>
          <div className="box">
            <button className="px-4 py-2 bg-purple-800 hover:bg-purple-900 rounded text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
