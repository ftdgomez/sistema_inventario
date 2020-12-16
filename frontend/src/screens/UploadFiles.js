import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InlineLoader from '../components/InlineLoader';
import {toast} from 'react-toastify'

const UploadFiles = ({ imgpaths, setImgPaths}) => {
    const [prevFiles, setPrevFiles] = useState(null)
    const [imgCollection, setImgCollection] = useState('')
    const [uploading, setUploading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
      if (imgpaths && !prevFiles)
      {
        setPrevFiles(imgpaths.map(e => `/${e.destinationPath}`))
      }
    }, [imgpaths])

    const prevUrlHandler = (files) => {
      let arrFilesUrl = [];
      for (let i = 0; i < files.length; i++) {
         arrFilesUrl.push(URL.createObjectURL(files[i]))
      }
      setPrevFiles(arrFilesUrl)
      setImgCollection(files)
    }

    const submitHandler = async () => {
        if (imgCollection !== '')
        {
          const formData = new FormData();

          for (const key of Object.keys(imgCollection)) {
              formData.append('images', imgCollection[key])
          }
          setUploading(true)
          try {
            const {data} = await axios.post("/api/fileupload", formData, {})
            console.log(data)
            setImgPaths(data.imgpaths)
            setUploading(false)
            setSuccess(true)
            toast.success('Bien! las imágenes ya han sido subidas, si ya has terminado de rellenar los campos puedes hacer click en "Actualizar Producto".')
          } catch (error) {
            console.log(error)
            setUploading(false)
            toast.error('Parece que ha ocurrido un error con la subida de imagenes, por favor. Inténtalo de nuevo.')
          }
        }
        else
        {
          alert('error, por favor incluya imagenes en este campo antes de cargar')
        }
    }
    return (
      <div>
        <div className="form-group preview">
            {prevFiles && prevFiles.map((file, index) => (
              <img key={`img-${index}`} style={{width: '200px', height: 'auto'}} src={file} alt="" />
            ))} 
        </div>
        <div className="form-group" style={{position: 'relative', display: success ? 'none' : 'block'}}>
            <input
            style={{
              position: 'relative',
              zIndex: '2',
              width: '100%',
              height: '240px',
              opacity: '0',
              display: ''
            }}
            type="file" name="imgCollection" id="imgCollection" onChange={(e)=>prevUrlHandler(e.target.files)} multiple />
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '240px',
              zIndex: '1',
              border: '2px dashed #266da6'
            }} className="d-flex align-items-center justify-content-center text-center">
              <p>Haz click aquí para subir imagenes o déjalas caer en este cuadro.</p>
            </div>
        </div>
        <div className="form-group">
          {prevFiles &&
            <button onClick={submitHandler} className="btn btn-primary btn-block" type="button">{uploading ? <InlineLoader /> : 'Cargar Imagenes'}</button>
          }
        </div>
      </div>
    )
}

export default UploadFiles
