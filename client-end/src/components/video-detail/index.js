import React, { Fragment, useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import videoshare from "apis/videoshare";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import {
  DislikeOutlined,
  LikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const VideoDetail = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateURL = (url) => {
    navigate(`${url}`);
  };

  const fetchVideo = async () => {
    setLoading(true);

    try {
      const response = await videoshare.get(`/videos/${id}`);
      setVideo(response.data.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const likeOrDislikeVideo = async (type) => {
    try {
      console.log(type);
      console.log(localStorage.getItem("accessToken"));
      const response = await videoshare.patch(
        `/videos/${id}/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Operation success");
        fetchVideo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("video", video);
  if (loading) return <p>Loading...please wait</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <CardContent>
          <iframe
            title={video?.youtubeURL}
            src={`${video?.youtubeURL}`}
            style={{ width: "100%", height: "350px" }}
          ></iframe>
          {localStorage.getItem("accessToken") && (
            <Fragment>
              <Button size="small" onClick={() => likeOrDislikeVideo("like")}>
                <LikeOutlined />
              </Button>
              <Button
                size="small"
                onClick={() => likeOrDislikeVideo("dislike")}
              >
                <DislikeOutlined />
              </Button>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Liked" {...a11yProps(0)} />
                        <Tab label="Disliked" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <p>Total: {video?.liked.total}</p>
                      <p>Users</p>
                      {video &&
                        video.liked.users.map((user) => {
                          return (
                            <CardContent>
                              <p>User: {user.name}</p>
                            </CardContent>
                          );
                        })}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <p>Total: {video?.disliked.total}</p>
                      {video &&
                        video.disliked.users.map((user) => {
                          return (
                            <CardContent>
                              <p>User: {user.name}</p>
                            </CardContent>
                          );
                        })}
                    </TabPanel>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Fragment>
          )}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigateURL(`/`)}>
            Return
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
};

export default VideoDetail;
