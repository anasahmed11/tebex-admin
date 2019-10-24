import palette from "../../../site-colors";

export default theme => ({
    card: {
      display: 'flex',
      height: 400,
    },
    details: {
      display: 'flex',
      flex: '1 0 60%',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      backgroundColor: palette.second,
      color: palette.white,
    },
    cover: {
      width: '100%',
    },
});