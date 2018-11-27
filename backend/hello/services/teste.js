export default (req, res) => {
    return res.json({ msg: 'Hello ' + req.params.nome})
}