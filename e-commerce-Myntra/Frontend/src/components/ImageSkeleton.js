import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ImageSkeleton() {
  return (
    <div>
      <div className="row gx-0">
        <div className="col-lg-6 col-12 p-5">
          <Skeleton height={800} />
        </div>
        <div className="col-lg-6 col-12 p-5">
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <Skeleton height={30} />
          <br></br>
          <Skeleton height={260} />
         
          <br></br>
          <Skeleton height={260} />
          <Skeleton height={50} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <br></br>
          <Skeleton height={128} />
          <br></br>
          <Skeleton height={160} />
          <br></br>
          <Skeleton height={120} />
        </div>
      </div>
    </div>
  );
}

export default ImageSkeleton;
