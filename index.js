const express = require('express')
const os = require('os')
const fs = require('fs')
const nodeDiskInfo = require('node-disk-info')
const free = require("free-memory")
const app = express()
const port = 3000
const api_version = 'v1.0'

app.get('/pi_mon',(req,res) => {
    res.json({version: api_version, host: os.hostname()})
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

app.get('/pi_mon/disks', (req,res) => {
    const disks = nodeDiskInfo.getDiskInfoSync();
    res.json({
        version: api_version,
        host: os.hostname(),
        data: disks
    })
})

app.get('/pi_mon/memory', (req,res) => {
    free(function(err, info) {
        res.json({
            version: api_version,
            host: os.hostname(),
            data: info
        })
    })
})

app.get('/pi_mon/cpus', (req, res) => {
    res.json({
        version: api_version,
        host: os.hostname(),
        data: os.cpus()        
    })
})

app.get('/pi_mon/loadavg', (req, res) => {
    res.json({
        version: api_version,
        host: os.hostname(),
        data: os.loadavg()
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))