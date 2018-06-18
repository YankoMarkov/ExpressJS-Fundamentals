const fs = require('fs')
const url = require('url')
const db = require('../config/dataBase')
const formidable = require('formidable')
const shortid = require('shortid')
const viewAllPath = './views/viewAll.html'
const addMemePath = './views/addMeme.html'
const detailsPath = './views/details.html'
const statusPath = './views/status.html'

let memeGenerator = (id, title, memeSrc, description, privacy) => {
  return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now()
  }
}

let defaultRes = (res, data) => {
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  res.end(data)
}

let viewAll = (req, res) => {
  let tempDb = db.getDb()
  tempDb = tempDb.sort((a, b) => {
    return b.dateStamp - a.dateStamp
  })
  fs.readFile(viewAllPath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }
    let container = ''

    for (let meme of tempDb) {
      container += `<div class="meme"><a href="/getDetails?id=${meme.id}"><img class="memePoster" src="${meme.memeSrc}"/></div>`
    }
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', container)
    defaultRes(res, data)
  })
}

let viewAddMeme = (req, res) => {
  fs.readFile(addMemePath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }
    defaultRes(res, data)
  })
}

let addMeme = (req, res) => {
  let form = new formidable.IncomingForm()
  let folderNumber = db.getDb.length % 1000
  let imagePath = `./public/memeStorage/${folderNumber}`

  form
    .on('error', (err) => {
      console.log(err.message)
      return
    })
    .on('fileBegin', (name, file) => {
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath)
      }
      if (file.type === 'image/jpeg') {
        let fileName = shortid.generate()
        let fileExtension = file.name.split('.').pop()
        file.path = `${imagePath}/${fileName}.${fileExtension}`
      } else {
        res.end('<h1>Only .jpg files accepted</h1>')
      }
    })
  form.parse(req, (err, fields, files) => {
    let id = shortid.generate()
    let createMeme = memeGenerator(id, fields.memeTitle, files.meme.path, fields.memeDescription, fields.status)
    db.add(createMeme)
    db.save().then(() => {
      viewAll(req, res)
    })
  })
}

let getDetails = (req, res) => {
  fs.readFile(detailsPath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    }
    let query = url.parse(req.url, true).query
    let id = query.id
    let tempDb = db.getDb()
    tempDb = tempDb.find(a => a.id === id)

    if (tempDb.hasOwnProperty('privacy')) {
      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>',
        `<div class="content">
        <img src="${tempDb.memeSrc}" alt=""/>
        <h3>Title: ${tempDb.title}</h3>
        <p> ${tempDb.description}</p>
        <button><a href="${tempDb.posterSrc}">Download Meme</a></button>
        </div>`)
      defaultRes(res, data)
    } else {
      res.end('<h1>This image is private!</h1>')
    }
  })
}

module.exports = (req, res) => {
  let id = ''
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}
