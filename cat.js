const childProcess = require('child_process')
const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.send(`
        <h1>File Viewer</h1>
        <form method='GET' action='/view'>
        <input name=filename/>
        <input type='submit' value='Submit'
        </form>
    `)
})

app.get('/view', (req,res) => {
    const { filename }=req.query
    const child = childProcess.spawnSync('cat', [filename])
    if (child.status !== 0){
        res.send(child.stderr.toString())
    } else{
        res.send(child.stdout.toString())
    }
})

app.listen(4000)