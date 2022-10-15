import Home from "pages/home/index";
import VideoDetail from "components/video-detail/index";
import VideoList from "components/videoList/index";

const MainRoutes = {
  path: "/",
  element: <Home />,
  children: [
    {
      path: "/",
      element: <VideoList />,
    },
    {
      path: "/videos",
      children: [
        {
          path: ":id",
          element: <VideoDetail />,
        },
      ],
    },
  ],
};

export default MainRoutes;
