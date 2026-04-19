import React, { useEffect, useState } from "react";
import {
  AppBar,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar(props) {
  const location = useLocation();
  const [contextLabel, setContextLabel] = useState("User List");
  const { advancedFeaturesEnabled, onAdvancedFeaturesChange } = props;

  useEffect(() => {
    let isMounted = true;

    const setNameContext = async (prefix, userId) => {
      try {
        const user = await fetchModel(`/user/${userId}`);
        if (!isMounted || !user) return;
        const fullName = `${user.first_name} ${user.last_name}`;
        setContextLabel(prefix ? `${prefix} ${fullName}` : fullName);
      } catch {
        if (isMounted) setContextLabel(prefix || "Photo Sharing App");
      }
    };

    const usersMatch = matchPath("/users/:userId", location.pathname);
    const photosWithPhotoMatch = matchPath("/photos/:userId/:photoId", location.pathname);
    const photosMatch = photosWithPhotoMatch || matchPath("/photos/:userId", location.pathname);
    const commentsMatch = matchPath("/comments/:userId", location.pathname);

    if (usersMatch?.params?.userId) {
      setNameContext("", usersMatch.params.userId);
    } else if (photosMatch?.params?.userId) {
      setNameContext("Photos of", photosMatch.params.userId);
    } else if (commentsMatch?.params?.userId) {
      setNameContext("Comments by", commentsMatch.params.userId);
    } else if (location.pathname === "/users") {
      setContextLabel("User List");
    } else {
      setContextLabel("Photo Sharing App");
    }

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <div className="topbar-left">
          <Typography variant="h6" color="inherit" noWrap>
            Nguyen Huu Niem
          </Typography>
          <Typography variant="h6" color="inherit" noWrap sx={{ ml: 24 }}>
            {contextLabel}
          </Typography>
        </div>
        <FormControlLabel
          className="topbar-toggle"
          control={
            <Checkbox
              checked={advancedFeaturesEnabled}
              onChange={(e) => onAdvancedFeaturesChange(e.target.checked)}
              color="default"
              size="small"
            />
          }
          label="Enable Advanced Features"
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
