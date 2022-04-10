import styled from "styled-components";
import logoImage from "../../assets/images/netflixlogo.png";
import backgroundImg from "../../assets/images/footer-bg.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Footer = () => {
  return (
    <FooterPanel
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="footer__content ">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logoImage} alt="logo" />
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <a href="/">Home</a>
            <a href="/">Contact us</a>
            <a href="/">Term of services</a>
            <a href="/">About us</a>
          </div>
          <div className="footer__content__menu">
            <a href="/">Live</a>
            <a href="/">FAQ</a>
            <a href="/">Premium</a>
            <a href="/">Privacy policy</a>
          </div>
          <div className="footer__content__menu">
            <a href="/">Must watch</a>
            <a href="/">Recent release</a>
            <a href="/">Top IMDB</a>
          </div>
        </div>
      </div>
      <div className="signature">
        <p>
          @2022 Made with <FavoriteBorderIcon /> by{" "}
          <a
            href="https://github.com/lukehoang1905"
            target={"_blank"}
            rel="noreferrer"
          >
            Duy Cao
          </a>
        </p>
      </div>
    </FooterPanel>
  );
};

export default Footer;

const FooterPanel = styled.div`
  margin-top: 5em;
  padding-bottom: 2em;
  color: rgba(255, 255, 255, 0.7);

  .footer__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
      height: 30vh;
    }

    .footer__content__logo {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 25%;
      img {
        width: 240px;
      }
    }
    .footer__content__menus {
      height: 100%;
      flex-grow: 1;
      font-size: 2em;
      @media only screen and (max-width: 600px) {
        font-size: 1.2em;
      }
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        text-align: left;
        height: 100%;

        a {
          margin: 5px 0;

          &:hover {
            color: red;
          }
        }
      }
    }
  }

  .signature {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding-right: 1em;
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      cursor: default;
    }

    a:hover {
      color: red;
    }
  }
`;
