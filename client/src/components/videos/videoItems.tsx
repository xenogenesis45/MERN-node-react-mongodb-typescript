import React from 'react'
import { video } from './interface'
import ReactPlayer from 'react-player/youtube'
import './VideoItems.css'
import { useHistory } from 'react-router'
import * as VideoService from './videoService'

import { toast } from 'react-toastify'

interface props {
    video: video
    loadVideos: () => void
}

const VideoItems = ({ video, loadVideos }: props) => {

    const history = useHistory();

    const handleDelete = async (id: string) => {
        await VideoService.deleteVideo(id)
        toast.error('Video eliminado')
        loadVideos()
    }


    return (
        <div className="col-md-4 p-2">
            <div className="card card-body  " style={{ cursor: 'pointer', height: '100%' }}  >
                <div className="d-flex justify-content-between">
                    <h5 onClick={() => history.push(`/update/${video._id}`)} className='word'>
                        {video.title}...
                    </h5>
                    <span className="text-danger" onClick={() => video._id && handleDelete(video._id)}>
                        ❌
                    </span>
                </div>
                <p className='box'>{video.description}.....</p>
                <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer url={video.url} width="100%" height="25rem" controls />
                </div>
            </div>
        </div >
    )
}
export default VideoItems