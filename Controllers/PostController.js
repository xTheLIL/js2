const pool = require('../db');  // Импортируем объект pool для работы с базой данных

class PostController {

    // Получение всех постов
    async createPost(req, res) {
        const { user_id, title, body } = req.body;

        try {
            // Проверяем, существует ли пользователь с таким user_id
            const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
            if (userResult.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Если пользователь существует, создаём пост
            const result = await pool.query(
                'INSERT INTO posts (user_id, title, body) VALUES ($1, $2, $3) RETURNING *',
                [user_id, title, body]
            );
            res.json(result.rows[0]);  // Возвращаем созданный пост
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Server error, unable to create post.' });
        }
    }

    // Получение всех постов
    async getAllPosts(req, res) {
        try {
            const result = await pool.query('SELECT * FROM posts');
            res.json(result.rows);
        } catch (error) {
            console.error('Error getting posts:', error);
            res.status(500).json({ message: 'Server error, unable to fetch posts.' });
        }
    }

    // Получение поста по ID
    async getPostById(req, res) {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
            const post = result.rows[0];
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);  // Возвращаем пост по ID
        } catch (error) {
            console.error('Error getting post:', error);
            res.status(500).json({ message: 'Server error, unable to fetch post.' });
        }
    }
}

module.exports = new PostController();