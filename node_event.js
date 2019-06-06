const nodemailer = require('nodemailer')
const events = require('events')
const fs = require('fs')
const eventEmitter = new events.EventEmitter()
const path = require('path')
const baseDir = path.join(__dirname, './data')
// events
let createFile = ()=>{
    let day = new Date()
    fs.open(`${baseDir}/Alex_Collazo.txt`, 'w', day, (err)=>{
        if(err) throw err
        console.log('Saved!')
    })
    setTimeout(readFile, 10000)
}

let readFile = ()=>{
    fs.readFile(`${baseDir}/Alex_Collazo.txt`,(err, data)=>{
        if(err) throw err
        console.log(data)
    })

    setTimeout(updateFile, 10000)
}

let updateFile = ()=>{
    
    fs.appendFile(`${baseDir}/Alex_Collazo.txt`, 'updated', (err)=>{
        if(err) throw err
        console.log('updated')
    })
    setTimeout(deleteFile, 10000)
}

let deleteFile = ()=>{
    fs.unlink(`${baseDir}/Alex_Collazo.txt`, (err)=>{
        if(err) throw err
        console.log('Alex_Collazo.txt DELETED!')
    })
}

eventEmitter.on('mail', createFile)
eventEmitter.emit('mail')
// ======
// Sending an email
// ======

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pierce.collazo@codeimmersives.com',
        pass: 'Grenade1'
    }
})

let mailOptions = {
    from: 'pierce.collazo@codeimmersives.com',
    to: 'yuri.shkoda@codeimmersives.com',
    subject: 'event mailer assignment',
    text: 'Alex_Collazo.txt DELETED!'
}

transporter.sendMail(mailOptions, (err, info)=>{
    if(err) console.log(err)
    else console.log(`Email sent: ${info.response}`)
})