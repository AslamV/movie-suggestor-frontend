import React,{useState} from 'react'
import {Card,Avatar,CardHeader,CardActions,IconButton,CardContent,Typography,TextField,Button,Collapse} from '@material-ui/core'
import {ThumbUpAlt,ThumbUpAltOutlined,CommentRounded,SendOutlined,DeleteOutline} from '@material-ui/icons'
import {makeStyles} from "@material-ui/core/styles"
import {useDispatch} from 'react-redux'
import moment from 'moment';
import './post.css'
import Comments from './Comments';
import { addComment, deletePost,likeCount } from '../../../actions/posts'
function SinglePost({post,dlt=false}) {
  const user = JSON.parse(localStorage.getItem('profile'))
    const [expand, setexpand] = useState(false)
    const [comment, setcomment] = useState({message:'',postedBy:{name:user?.result?.name,selectedFile:user?.result?.selectedFile},postedAt:new Date().toISOString})
    const dispatch = useDispatch()
    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 0,
          paddingTop: '56.25%', // 16:9
        },
        expand: {
          transform: 'rotate(0deg)',
          marginLeft: 'auto',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        expandOpen: {
          transform: 'rotate(180deg)',
        },
      }));
      const handleExpandClick = () => {
        setexpand(!expand);
      };
      const handleComment = () => {
        dispatch(addComment(post._id,comment))
        setcomment({message:''})
      }
      const deletedPost = (id) => {
        dispatch(deletePost(id))
      }
    const classes = useStyles()
    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    return (
        <Card className='mt-3' color="">
                <CardHeader className='hed' avatar={ <Avatar src={post.creatorUrl}></Avatar> }   title={post.name} subheader={moment(post.createdAt).fromNow()}/>
                <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {post.message}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button size='small' onClick={() => dispatch(likeCount(post._id))} aria-label="likes">
                        <Likes/>
                    </Button>
                
                <IconButton  className={(classes.expand, {
                  [classes.expandOpen]: expand,
                  })} onClick={handleExpandClick}>
                    <CommentRounded/>
                </IconButton>
                <TextField className='mb-3 ml-auto'
                label="Suggest movies"
                value={comment.message}
                onChange={(e) => setcomment({...comment,message:e.target.value})}
                />
                <Button className='ml-10' size="small" color="primary" onClick={handleComment}>
                  <SendOutlined/>
                </Button>
                {dlt && 
                <Button className='ml-auto' size="small" color="primary" onClick={() => deletedPost(post._id)}>
                  <DeleteOutline/>
                </Button>
                }
                </CardActions>
                <Collapse in={expand} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Comments comments={post.comments}/>
                    </CardContent>
                </Collapse>
            </Card>
    )
}

export default SinglePost;
