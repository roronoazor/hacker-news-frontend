import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MediaCard from './MediaCard';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

function Main(props) {
  const { 
    posts,
    title,
    page = 1, 
    lastPage=1,
    handlePageChange,
    deleteItem
   } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <MediaCard 
          postId={post?.id}
          title={post?.title}
          by={post?.by}
          url={post?.url}
          text={post?.text}
          score={post?.score}
          type={post?.type}
          reference_id={post?.reference_id}
          deleteItem={deleteItem}
        />
      ))}
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
      >
        <Pagination 
          count={lastPage}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;