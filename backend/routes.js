import hello from './hello/index'
import upload from './upload/index'

export default (app) => {
    app.use('/', hello)
        .use('/file', upload)
}