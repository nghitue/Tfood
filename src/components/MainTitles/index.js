// import Button from "@/components/Button";
// import classNames from "classnames/bind";
// import styles from './Titles.module.scss';

// const cx = classNames.bind(styles);

function MainTitles({ title, subTitle, seeAll }) {
    if (seeAll) {
        return (
            <div className="fsc see-all-box">
                <h2 className="page-tit">
                    <span>{title}</span>
                    {subTitle}
                </h2>
                {/* <Button text className={cx('btn-see-all')}>See All</Button> */}
            </div>
        );
    } else {
        return (
            <h2 className="page-tit">
                <span>{title}</span>
                {subTitle}
            </h2>
        );
    }
}

export default MainTitles;
