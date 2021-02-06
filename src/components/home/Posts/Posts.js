import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Typography,CircularProgress,Container,Divider} from '@material-ui/core'
import SinglePost from './SinglePost'
import { getPosts } from '../../../actions/posts'
function Posts() {
    const posts = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getPosts())
    }, [])
    // console.log(posts)
    const sortedPost = posts.reverse()
    console.log(sortedPost)
    return (
        <div className="post mt-3">
            <Typography variant='h6'>Recent Posts</Typography>
            <Divider/>
            {!posts.length ? <CircularProgress/> : (
              <div>
                {sortedPost.map((post) => (
                  <Container className='row' >
                    <SinglePost post={post} dlt={false}/>
                  </Container>
                ))}
              </div>
            )}
            </div>
    )
}

export default Posts

