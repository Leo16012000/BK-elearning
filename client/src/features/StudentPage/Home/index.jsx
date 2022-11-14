import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

Home.propTypes = {};

function Home(props) {
  return (
    <div>
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              <p text-align="center">Welcome to BK-elearning Website</p>
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          image="https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/1004px-Logo-hcmut.svg.png"
          title="Live from space album cover"
        />
      </Card>
    </div>
  );
}

export default Home;
