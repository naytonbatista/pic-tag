import express from 'express'
import main from './services/main'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb )=>{

        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })

const router = express.Router()

router.post('/upload', upload.single('file'), main)

export default router