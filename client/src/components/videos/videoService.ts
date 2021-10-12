import axios from "axios";
import { video } from "./interface";

const API = 'http://localhost:4000'

export const getVideos = async () => {
    return await axios.get<video[]>(`${API}/videos`)
}

export const createVideo = async (video: video) => {
    return await axios.post(`${API}/videos`, video)
}

export const getVideo = async (id: string) => {
    return await axios.get<video>(`${API}/videos/${id}`)
}


export const updateVideo = async (id: string, video: video) => {
    return await axios.put<video>(`${API}/videos/${id}`, video)
}

export const deleteVideo = async (id: string) => {
    return await axios.delete<video>(`${API}/videos/${id}`)
}
