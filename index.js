const express = require('express')
const os = require('os')
const fs = require('fs')
const app = express()
const port = 3000
const api_version = 'v1.0'

app.get('/',(req,res) => {
    var data = fs.readFileSync('/sys/class/thermal/thermal_zone0/temp','utf8').split('\n')
    var temp 
    res.send(`Temp: ${data}`)
})

app.get('/pi_mon/temperature',(req,res) => {
    var data = fs.readFileSync('/sys/class/thermal/thermal_zone0/temp','utf8')
    var result = {
        version: api_version,
        host: os.hostname(),
        cpu_temperature: `${ data.trim() / 1000}C`
     }
    res.json(result)
})

app.listen(port, () => console.log(`Listening on port ${port}`))