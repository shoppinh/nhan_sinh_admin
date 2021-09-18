import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  // paper: {
  //   backgroundColor: '#fff',
   
  // },
  // img: {
  //   width: 100,
  //   height: 'auto',
  // },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '600px',
    margin: '100px auto',
  },
  field: {
    marginBottom: '1rem',
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '1rem',
    borderRadius: '12px',
    boxShadow: '.25rem .25rem 1rem rgba(0,0,0,.3)',
  },
  input: {
    position: 'absolute',
    left: '0px',
    cursor: 'pointer',
    opacity: 0,
    overFlow: 'hidden',
  },
}));
export default useStyle;
