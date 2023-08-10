import React from "react";
import "./Footer.css";
import { MdOutlineFacebook } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
const Footer = () => {
  return (
    <>
      <div className=" footer-bg-color  fontFamily ">
        <div className="container-fluid">
          <div className="row ">
            <div className="main p-3 pt-4">
              {/* for symbols */}
              <div id="follow">
                <div className="titles mb-1">follow us</div>
                <div
                  id="icons"
                  className="d-flex align-items-center justify-content-center flex-wrap"
                >
                  <button className="bg-lightColor px-2 py-1 rounded-circle text-white size">
                    <MdOutlineFacebook />
                  </button>
                  <button className="bg-lightColor px-2 py-1 rounded-circle text-white size">
                    <AiOutlineTwitter />
                  </button>
                  <button className="bg-lightColor px-2 py-1 rounded-circle text-white size">
                    <BsInstagram />
                  </button>
                  <button className="bg-lightColor px-2 py-1 rounded-circle text-white size">
                    <BsYoutube />
                  </button>
                  <button className="bg-lightColor px-2 py-1 rounded-circle text-white size">
                    <BiLogoLinkedinSquare />
                  </button>{" "}
                  <button className="bg-lightColor px-2 py-1 rounded-circle text-white size">
                    <GrMail />
                  </button>
                  {/* <Twitter size={28} color="#ffffff" strokeWidth={1.25} /> */}
                </div>
              </div>
              {/* for about us */}
              <div id="aboutUs">
                <div className="titles mb-1">about us</div>
                <div className="subTitles">
                  <a href="21" className="links">
                    Who we are{" "}
                  </a>
                  <a href="21" className="links">
                    belleBox{" "}
                  </a>
                  <a href="21" className="links">
                    consultation{" "}
                  </a>
                  <a href="21" className="links">
                    plastic neutral{" "}
                  </a>
                </div>
              </div>
              {/* for help */}
              <div id="help">
                <div className="titles mb-1">help</div>
                <div className="subTitles">
                  <a href="21" className="links">
                    become <span style={{ textTransform: "lowercase" }}>a</span>{" "}
                    partner{" "}
                  </a>
                  <a href="21" className="links">
                    Contact Us
                  </a>
                  <a href="21" className="links">
                    privacy policy
                  </a>
                  <a href="21" className="links">
                    terms & conditions{" "}
                  </a>
                </div>
              </div>
              {/* for subscribe */}
              <div id="subscribe">
                <div className="titles mb-1">subscribe</div>
                <div className="subTitles">
                  <a
                    href="21"
                    className="links"
                    style={{ textTransform: "none" }}
                  >
                    Get the latest{" "}
                    <span style={{ textTransform: "uppercase" }}>beauty</span>{" "}
                    fashion updates!{" "}
                  </a>
                  <div className="d-flex gap-2 flex-wrap">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className="inputEmail"
                    />
                    <button className="signUp-button">sign up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
