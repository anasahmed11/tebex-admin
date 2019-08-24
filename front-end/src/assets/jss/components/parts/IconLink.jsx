import COLORS from '../../../site-colors';

export default theme => ({
    icon: {
      margin: theme.spacing(1),
      fontSize: '30px',
      color: 'white',
      transition: theme.transitions.create('color'),
      '&:hover':{
          color: COLORS.HOME.Footer.Links.hover
      }
    },
    input: {
      display: 'none',
    },
});
  