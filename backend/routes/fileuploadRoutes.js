import express from 'express'
import path from 'path'
import multer from 'multer'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import { execSync } from 'child_process'

const router = express.Router()
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'tempuploads/')
  },
  filename(req,file,cb){
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

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
    const files = await imagemin(["tempuploads/*.{jpg,png,jpeg}"], {
      destination: 'public/compressed',
      plugins: [
        imageminWebp({ quality: 50 })
      ]
    })
    console.log(files)
    // execSync(`mv ${process.cwd()}/tempuploads/* ${process.cwd()}/public/uncompressed`)
    execSync(`rm -rf ${process.cwd()}/tempuploads/*`)
    res.json({imgpaths: files.map(f => ({destinationPath: f.destinationPath, srcPath: f.destinationPath.substring(6)}) )});
  } catch (error) {
    console.log(error);
    res.send(400);
  }
})

router.get('/', (req, res) => {
  res.json({hello: 'world'})
})

export default router
