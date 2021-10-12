import express, { RequestHandler } from 'express'
import Video from './video'

export const getVideos: RequestHandler = async (req, res) => {
    try {
        const videos = await Video.find();
        return res.json(videos)
    }
    catch (error) {
        res.json(error)
    }

}

export const getVideo: RequestHandler = async (req, res) => {
    //contiene el valor del dato que se esta enviando
    // console.log(req.params)
    // return res.json(req.params.id)
    try {
        const videoFound = await Video.findById(req.params.id);

        //si no existe el id devuelve un error 
        if (!videoFound)
            return res.status(204).json()

        return res.json(videoFound)
    }
    catch (error) {
        res.json(error)
    }

}

export const createVideo: RequestHandler = async (req, res) => {
    try {
        const videoFound = await Video.findOne({ url: req.body.url });

        //Si la url existe no puede agregarse a la DB
        if (videoFound)
            return res.status(303).json({ message: "La url la existe" });

        const newVideo = new Video(req.body);
        const savedVideo = await newVideo.save();
        res.json(savedVideo);
    }
    catch (error) {
        console.error(error)
    }
    // const video = new Video(req.body)
    // console.log(video)
    // const saveVideo = await video.save
    // res.json(saveVideo)
};

export const deleteVideo: RequestHandler = async (req, res) => {
    try {
        const videoFound = await Video.findByIdAndDelete(req.params.id);

        //si no existe el id devuelve un error 
        if (!videoFound)
            return res.status(204).json()

        return res.json(videoFound)
    }
    catch (error) {
        res.json(error)
    }
}

export const updateVideo: RequestHandler = async (req, res) => {
    try {
        const videoUpdate = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!videoUpdate)
            return res.status(204).json()

        res.json(videoUpdate)
    }
    catch (error) {
        res.json(error)
    }
}
