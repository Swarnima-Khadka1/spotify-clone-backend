const musicModel =  require('../models/music.model');
const jwt= require('jsonwebtoken');
const albumModel= require('../models/album.model');
const { uploadFile } = require("../services/storage.service");

async function createMusic( req, res){

    const {title} = req.body;
    const file= req.file;

    if(!file){
        return res.status(400).json({message: "No file uploaded"});
    }

    const result = await uploadFile(file.buffer.toString('base64'));

    const music= new musicModel({
        uri: result.url,
        title,
        artist: req.user.id,
    })
    await music.save();
    res.status(201).json({
        message: "Music uploaded successfully",
        music:{
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}

async function createAlbum(req, res){
    
        const {title, musics} = req.body;
        const album = new albumModel({
            title,
            artist: req.user.id,
            musics: musics
        })
        await album.save();

        res.status(201).json({
            message: "Album created successfully",
            album:{ 
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })
    }

async function getAllMusics(req, res){
    const musics = await musicModel.find().limit(2).populate('artist');
    res.status(200).json({ 
        message:" All musics fetched successfully",
        musics: musics
    });
}
async function getAllAlbums(req, res){
    const albums = await albumModel.find().select("title artist").populate('artist').populate('musics');
    res.status(200).json({  
        message: "All albums fetched successfully",
        albums: albums
    });
}
async function getAlbumById(req, res){
    const albumId= req.params.albumId;
    const album = await albumModel.findById(albumId).populate('artist').populate('musics');
    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}

module.exports= {createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById};