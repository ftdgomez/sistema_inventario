import React, { useState, useEffect } from 'react';

const UploadFiles = ({ imgpaths, setImgPaths, imgCollection, setImgCollection }) => {
    const [prevFiles, setPrevFiles] = useState([])
    
    const prevUrlHandler = (files) => {
      let arrFilesUrl = [];
      for (let i = 0; i < files.length; i++) {
        arrFilesUrl.push(URL.createObjectURL(files[i]))
      }
      setPrevFiles(arrFilesUrl)
      setImgCollection(files)
    }
    

    useEffect(()=>{
      if (imgpaths && prevFiles.length < 1)
      {
        setPrevFiles(imgpaths.filter(i => i !== '/public/default.jpg'))
        // setImgPaths()
      }
/*       console.log(prevFiles) */
    }, [imgpaths])

    return (
      <div>
        <div className="preview-container">
   
          <div className={prevFiles.length > 0 ? 'form-group preview' : ''}
            style={{
              gridTemplateColumns: `repeat(${prevFiles.length < 3 ? prevFiles.length : 3}, 1fr)`
            }}
            >
              {prevFiles.map((file, index) => (
                <div key={`img-${index}`} className="img-cont-prev">
                  <img style={{width: '100%', height: 'auto'}} src={file} alt="" />
                  <span className="delete">x</span>
                </div>
              ))} 
          </div>
          <div className="form-group" style={{position: 'relative',
            display: prevFiles.length > 0 ? 'none' : 'block'}}>
              <input
              style={{
                position: 'relative',
                zIndex: '2',
                width: '100%',
                height: '160px',
                opacity: '0',
                display: ''
              }}
              type="file" name="imgCollection" id="imgCollection" onChange={(e)=>prevUrlHandler(e.target.files)} multiple />
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '160px',
                zIndex: '1',
                border: '2px dashed #e1e1e1'
              }} className="d-flex align-items-center justify-content-center text-center">
                <p className="p-4">Haz click aquí para subir imagenes o déjalas caer en este cuadro.</p>
              </div>
          </div>
        </div>
      {/*     
        <div className="form-group">
          {prevFiles &&
            <button onClick={submitHandler} className="btn btn-primary btn-block" type="button">{uploading ? <InlineLoader /> : 'Cargar Imagenes'}</button>
          }
        </div>
      */}
      </div>
    )
}

export default UploadFiles
