import { Grid } from "@mui/material";
import videoshare from "apis/videoshare";
import { AppContext } from "App";
import Navigation from "layout/Home/Navigation";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const appData = useContext(AppContext);

  const fetchVideos = async () => {
    appData.setLoading(true);
    try {
      const response = await videoshare.get("/videos");
      appData.setVideos(response.data.data.docs);
      appData.setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const callFetchVideos = async () => {
      await fetchVideos();
    };

    callFetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{}}>
        <Navigation />
      </Grid>
      <Grid item xs={12} sx={{}}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Home;
