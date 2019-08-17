export default theme => ({
    badge: {
        top: '0%',
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`,
      },
});