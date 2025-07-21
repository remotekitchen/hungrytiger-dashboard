import React from "react";
import styles from "./BlogsCard.module.css"; // Import the CSS module
import { Link } from "react-router-dom";

const BlogsCard = ({ blog }) => {
  const { title, content, navigateTo, img } = blog;
  return (
    <div
      className={`${styles.card} w-96 bg-base-100 my-6 shadow-xl relative overflow-hidden`}
    >
      <div className={styles.imageContainer}>
        <img src={img} alt="Shoes" />
        <div className={styles.overlay}>
          <Link to={`/blogs${navigateTo}`}>
            <button name="read-the-blog" className={styles["read-btn"]}>
              Read the Blog
            </button>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <h1 className="card-title">
          {title}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h1>
        <p>{content}</p>
        {/* <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogsCard;
