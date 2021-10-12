import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { video } from './interface'
import * as VideoService from './videoService'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'

type InputeChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id: string;
}

const VideoForm = () => {

    const history = useHistory()

    //para obtener el id y poderlo actualizar
    const params = useParams<Params>()
    console.log(params)

    const initialState = {
        title: '',
        description: '',
        url: ''
    }

    const [video, setvideo] = useState<video>(initialState)

    const handleInputChange = (e: InputeChange) => {
        setvideo({ ...video, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault()
            //si el params.id no existe cree sino actualize
            if (!params.id) {
                console.log(video)
                const res = await VideoService.createVideo(video)
                toast.success('Nuevo video agregado')
            }
            else {
                await VideoService.updateVideo(params.id, video)
            }
            //para que se redireccione al inicio
            history.push('/')

            //para que se limpien las cajas de texto
            // setvideo(initialState)
        } catch (error) {
            console.log(error)
        }

    }

    const getVideoId = async (id: string) => {
        const res = await VideoService.getVideo(id)

        //de res.data se extraera el titulo, desceipcion y url
        const { title, description, url } = res.data
        //y se le pasan los datos a los campos con los valores
        setvideo({ title, description, url })
        console.log(res);
    }

    useEffect(() => {
        if (params.id) getVideoId(params.id)
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card=body container">
                        <h3>Nuevo video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mt-1">
                                <input type="text" name='title' className="form-control"
                                    placeholder='Escribe el titulo'
                                    autoFocus
                                    value={video.title}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="form-group mt-1">
                                <input type="text" name='url'
                                    className="form-control" placeholder='https://...'
                                    value={video.url}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="form-group mt-1">
                                <textarea name="description" rows={3}
                                    className="form-control" placeholder='descripcion'
                                    value={video.description}
                                    onChange={handleInputChange}></textarea>
                            </div>
                            {
                                // Si el parametro(id) existe significa que quiere actualizar si no, quiere crear  
                                params.id ?
                                    <button className='btn btn-primary mt-3' > Actualizar video</button>
                                    :
                                    <button className='btn btn-primary mt-3' >Crear video</button>
                            }
                            <div className='mt-1' />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VideoForm