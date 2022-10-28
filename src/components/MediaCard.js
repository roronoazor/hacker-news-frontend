import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function MediaCard(
  {
    postId,
    type,
    by,
    text,
    url,
    title,
    score,
    deleteItem,
    reference_id
  }
) {
  return (
    <Card sx={{ margin: '2%' }}>
      <CardMedia
        component="img"
        height="240"
        image="http://bajajqutegh.com/wp-content/uploads/2020/01/placeholder_1200x704-Dark.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Source: {(reference_id == null) ? 'Local' : 'Hacker News'}
        </Typography>
        { 
          ((url != '') && (url != null)) && (
            <Link href={url} underline="hover" el="noreferrer" target="_blank">
              View Story
            </Link>
          )
        }
      </CardContent>
      <CardActions>
        <Button size="small">{`By: ${by}`}</Button>
        <Button variant="outlined" size="small">{`Type: ${type}`}</Button>
      
          {(reference_id == null) && 
            <Button
             variant="outlined"
             size="small"
             color='error'
             onClick={() => deleteItem(postId)}
            >
              Delete
            </Button>
          }
        
        
      </CardActions>
    </Card>
  );
}