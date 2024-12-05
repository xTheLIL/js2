const express = require('express');
const PostController = require('../Controllers/PostController');
const UserController = require('../Controllers/UserController');

const router = express.Router();

// Создание нового поста
router.post('/posts', PostController.createPost);

// Получение всех постов
router.get('/posts', PostController.getAllPosts);

// Получение поста по ID
router.get('/posts/:id', PostController.getPostById);

module.exports = router;