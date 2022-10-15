import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const VideoItem = (video) => {
  return (
    <React.Fragment>
      <CardContent>
        <iframe
          title={video.video.youtubeURL}
          src={`${video.video.youtubeURL}`}
          style={{ height: "200px", width: "300px" }}
        ></iframe>
      </CardContent>
      <CardActions>
        <Button size="small">Click to like/dislike</Button>
      </CardActions>
    </React.Fragment>
  );
};

export default VideoItem;
