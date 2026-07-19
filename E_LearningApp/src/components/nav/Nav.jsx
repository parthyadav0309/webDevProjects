import React, { useState } from "react";
import style from "./Nav.module.css";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

function Nav() {
  const navigate = useNavigate();
 const [courseButtonClicked, setCourseButtonClicked] = useState(false);
  function onButton(){
    navigate("/courses");
    setCourseButtonClicked(true);
  }

   function onClickHome() {
     navigate("/");
     
   }
  return (
    <>
      <nav>
        <div className={style.nav_container}>
          <div className={style.nav_title_wrapper}>
            <Link to="/">
            <img
              className={style.logo}
              src="https://files.codingninjas.in/pl-ninja-16706.svg"
              alt="logo"
              onClick={onClickHome}
              
            />
            </Link>
            <h4>Coding Ninjas</h4>
          </div>
          <div className={style.nav_details}>
            {/* <button onClick={onButton}>
              {courseButtonClicked ? "OnCourses" : "Courses"}
            </button> */}
            <button>
              <NavLink to="/courses">
                {({isActive})=>(isActive?"On Courses":"Courses")}
              </NavLink>
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Nav;

//  <img
//    alt='cart-icon'
//    src='https://cdn-icons-png.flaticon.com/512/4903/4903482.png'
//    className={`${style.cart_icon} ${style.icon} `}
//  />;
