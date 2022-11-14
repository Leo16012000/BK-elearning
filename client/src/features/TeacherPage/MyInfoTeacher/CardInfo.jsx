import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: '30vw',
    marginRight: '30vw',
  },
  details: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    height: 150, 
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const teacher = props.teacher;

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {teacher.TeacherName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {teacher.TeacherId}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image="https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/1004px-Logo-hcmut.svg.png"
        title="Live from space album cover"
      />
    </Card>
  );
}
