const express= require('express');
const router= express.Router();
const musicController= require('../controllers/music.controller.js');
const multer= require('multer');
const authMiddleware= require('../middlewares/auth.middleware.js');

const upload= multer({storage: multer.memoryStorage()});

router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

router.get("/all", authMiddleware.authUser, musicController.getAllMusics);
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById);
module.exports= router;