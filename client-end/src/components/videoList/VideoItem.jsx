import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const VideoItem = (video) => {
  const navigate = useNavigate();

  const navigateURL = (url) => {
    navigate(`${url}`);
  };

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
        <Button
          size="small"
          onClick={() => navigateURL(`/videos/${video.video._id}`)}
        >
          Click to like/dislike
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export default VideoItem;
