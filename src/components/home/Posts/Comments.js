import React from 'react'
import {Avatar} from '@material-ui/core'
import moment from 'moment'
import './comment.css'
function Comments({ comments }) {
    return (
        <div className='container'>
            {comments.map((c) => (
                <div className="card p-3 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                        <Avatar src={c.postedBy.selectedFile} className="mr-2"/>
                        <span ><small className="font-weight-bold text-primary mr-2">{c.postedBy.name}</small>
                        <small className="font-weight-bold">{c.message}</small>
                        </span>
                        </div>
                        <small>{moment(c.postedAt).fromNow()}</small>
                </div>
            </div>
            ))}
        </div>
    )
}

export default Comments
