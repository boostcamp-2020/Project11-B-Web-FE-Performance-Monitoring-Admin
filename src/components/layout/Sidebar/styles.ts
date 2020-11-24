import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  container: {
    height: '100vh',
    backgroundColor: '#311b92',
  },
  profile: {},
  profileMenu: {
    position: 'relative',
  },
  profileMenuBtn: {
    cursor: 'pointer',
  },
  activeStyle: {
    opacity: '1 !important',
    '&::before': {
      position: 'absolute',
      border: '2px solid white',
      borderTopRightRadius: '1rem',
      borderBottomRightRadius: '1rem',
      content: '" "',
      height: '50%',
    },
  },
});

export default useStyle;
