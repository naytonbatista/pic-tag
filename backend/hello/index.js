import express from 'express'
import main from './services/main'
import teste from './services/teste'


const router = express.Router()

router.get('/', main)

router.get('/:nome', teste)


export default router