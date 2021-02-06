import React from 'react'
import {useSelector} from 'react-redux'
import SinglePost from '../home/Posts../SinglePost'
function MyPosts() {
    const posts = useSelector((state) => state.posts)
    const user = JSON.parse(localStorage.getItem('profile'))
    const id = user?.result?._id
    const myPost = posts.filter((post) => post.creator === id)
    console.log(myPost)
    return (
        <div>
            {myPost.map((post) => <SinglePost post={post} dlt={true}/> )}
        </div>
    )
}

export default MyPosts
