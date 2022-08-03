import Button from "@/components/Button";
import classNames from "classnames/bind";

import styles from "@/components/Layout/components/Footer"

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="f-info">
          {/* <Button text className={`junita-script ${cx('logo')}`}>TFood</Button> */}
          {/* <a className="logo" href="#">TFood</a> */}
          <Button className={`junita-script ${cx('logo')}`} to={'/'}>
            TFood
          </Button>
          <div className="box-4-column">
            <div className="item">
              <ul>
                <li><Button text to='about-dev'>About Developer</Button></li>
                <li><Button text to='blog-dev'>Developer's Blog</Button></li>
              </ul>
            </div>
            <div className="item">
              <ul>
                <li><Button text to='about'>About TFood</Button></li>
                <li><Button text to='blog'>Blog</Button></li>
              </ul>
            </div>
            <div className="item">
              <ul>
                <li><Button text to='help'>Help</Button></li>
                <li><Button text to='faq'>FAQs</Button></li>
              </ul>
            </div>
            <div className="item">
            </div>
          </div>
        </div>
        <div className="f-policy">
          <Button text to='about'>@ 2022 Tfood</Button>
          <Button text to='terms'>Terms of service</Button>
          <Button text to='policy'>Privacy Policy</Button>
        </div>
      </div>
    </footer>
  );
}
