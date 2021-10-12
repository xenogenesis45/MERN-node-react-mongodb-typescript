import React, { useEffect, useState } from 'react'
import { video } from './interface'

import VideoItems from './videoItems'


import * as VideoService from './videoService'

const VideoList = () => {

    const [videos, setVideos] = useState<video[]>([])

    const loadVideos = async () => {
        try {
            const res = await VideoService.getVideos()

            //Organiza los videos de forma que el video que se agrega se coloca de primero.
            const formatedVideos = res.data.map((video) => {
                return {
                    ...video,
                    createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                    updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
                };
                //se comparan los elementos se restan y si es menor se colocan de primero, y se acomodan por fecha
            }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            // setVideos(res.data)
            setVideos(formatedVideos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadVideos()
    }, [])

    return (
        <div className="row">
            {videos.map((video) => (
                <VideoItems video={video} key={video._id} loadVideos={loadVideos} />
            ))}
        </div>
    )
}
export default VideoList
