import express from 'express'
import path from 'path'
import multer from 'multer'
import sharp from 'sharp'
import {nanoid} from 'nanoid'

const router = express.Router()
/* const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'tempuploads/')
  },
  filename(req,file,cb){
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
}) */
const storage = multer.memoryStorage() // <- para poder usar sharp sin tener que reabrir la imagen

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname)
  {
    return cb(null, true)
  }
  else
  {
    return cb('Solo se permite la subida de imagenes.')
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
})

router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const filepaths = []
    for (let i = 0; i < req.files.length; i++) {
      const picture = req.files[i];
      const picname = `pic-${nanoid(5)}-${nanoid(2)}.webp`
      await sharp(picture.buffer)
                                .resize(800,800, { fit: 'inside'})
                                .toFile(`${process.cwd()}/public/img/${picname}`)

      filepaths.push(`/public/img/${picname}`)
    }

    res.status(201).json({imgpaths: filepaths})
  } catch (error) {
    console.log(error);
    res.status(400).json({error: 'Error al subir el archivo.'});
  }
})

router.get('/', (req, res) => {
  res.json({hello: 'world'})
})

export default router
