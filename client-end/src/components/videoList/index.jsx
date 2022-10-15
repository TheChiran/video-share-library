import React, { Fragment, useContext } from "react";
import { AppContext } from "App";
import Grid from "@mui/material/Grid";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const appData = useContext(AppContext);

  if (appData.loading) return <p>Loading...Please wait</p>;

  return (
    <Grid container spacing={2}>
      {appData.videos?.map((video) => {
        return (
          <Grid item xs={12} md={4} lg={4}>
            <VideoItem key={video._id} video={video} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VideoList;
