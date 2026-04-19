import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";

const App = () => {
  const [advancedFeaturesEnabled, setAdvancedFeaturesEnabled] = useState(false);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              advancedFeaturesEnabled={advancedFeaturesEnabled}
              onAdvancedFeaturesChange={setAdvancedFeaturesEnabled}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos advancedFeaturesEnabled={advancedFeaturesEnabled} />}
                />
                <Route
                  path="/photos/:userId/:photoId"
                  element={<UserPhotos advancedFeaturesEnabled={advancedFeaturesEnabled} />}
                />
                <Route path="/users" element={<UserList />} />
                <Route
                  path="/comments/:userId"
                  element={<UserComments advancedFeaturesEnabled={advancedFeaturesEnabled} />}
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
