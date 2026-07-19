import React from "react";
import styles from "./Chapter.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import coursesData from "../../../data/courses.json";

function Chapter() {
  const { courseId, chapterId } = useParams();
  const course = useOutletContext();
 
  // console.log(chapterId);
  // const chap = course.find((chap)=>chap.id === chapterId);

    // console.log(course.chapters[chapterId-1].description);  
    const chap = course.chapters[chapterId-1];
  return (
    <div>
      <h1>{chap.title}</h1>
      <h2>{chap.description}</h2>
      <p className={styles.para}>{}</p>
      <br />
      <br />
      <div className={styles.videos}>
        {/*TASK:5 CHAPTER VIDEO SRC SHOULD BE GIVEN IN THE SOURCE */}
        {chap.video ? (
          <iframe
            width="800"
            height="560"
            src={chap.video}
            title="React Video"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <h2>Video not available</h2>
        )}
      </div>
    </div>
  );
}

export default Chapter;
