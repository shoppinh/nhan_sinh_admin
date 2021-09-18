import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  topGrid: {
    margin: '10px auto 50px',
  },
  imgTitle: {
    padding: '10px 20px',
    // backgroundColor: theme.palette.secondary.main,
    // color: '#fff',
    marginBottom: '0px',
  },
  bannerImg: {
    height: 350,
  },
  title: {
    paddingTop: '20px',
  },
  detail: {
    paddingTop: 20,
  },
}));

export default useStyle;
