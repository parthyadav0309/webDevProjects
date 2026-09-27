import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton() {
  return (
    <div>
      <div className="row gx-0 ml-3">
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 pr-3 mb-4">
          <Skeleton height={300} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 pr-3 mb-4">
          <Skeleton height={300} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 pr-3 mb-4">
          <Skeleton height={300} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 pr-3 mb-4">
          <Skeleton height={300} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
