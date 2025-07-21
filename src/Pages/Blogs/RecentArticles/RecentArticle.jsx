import React from "react";
import { BsArrowRight } from "react-icons/bs";
import styles from "./RecentArticles.module.css";
import { useNavigate } from "react-router-dom";
const RecentArticle = ({ data }) => {
  const { title, desc, navigateTo } = data || {};
  const navigate = useNavigate();
  return (
    <div
      className={`card w-96 bg-base-100 shadow-xl cursor-pointer ${styles.cardContainer}`}
    >
      <div className="card-body">
        <small className="uppercase">experience</small>
        <h1
          className={`card-title font-bold my-2 text-base-content  ${styles.changedColor}`}
        >
          {title}
        </h1>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <div onClick={() => navigate(`/blogs/${navigateTo}`)}>
            <BsArrowRight size={30} className={`${styles.moveIcon}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentArticle;
