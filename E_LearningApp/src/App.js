import Hero from "./pages/app/hero/Hero";
import Nav from "./components/nav/Nav";
import Courses from "./pages/app/courses/Courses";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "./pages/app/details/Details";
import Learn from "./pages/app/learn/Learn";
import Chapter from "./pages/app/chapter/Chapter";
import Page404 from "./pages/misc/Page404/Page404";

function App() {

  const router = createBrowserRouter([
    {
      errorElement: <Page404/>,
      path: "/",
      element: <Nav />,
      children: [
        {
          index: true,
          element: <Hero />,
        },
        {
          path: "/courses",
          children: [
            {
              index: true,
              element: <Courses />,
            },
            {
              path: ":courseId",
              children: [
                {
                  index: true,
                  element: <Details />,
                },
              ],
            },
          ],
        },
        {
          path: "/learn/:courseId",
          element: <Learn />,
          children: [
            {
              path: "chapter/:chapterId",
              element: <Chapter />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      {/* <Nav />
      <Hero />
      <Courses /> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
