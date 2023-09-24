const Player = require('../models/playerModel'); // Post 모델을 가져옵니다.

exports.getAllPlayers = async (req, res) => {
    try {
        const { page, perpage, category } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출
        console.log(req.query);
        const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
        const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)
        const type = category||'player_name';
        console.log(type);

        const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

        // 총 게시물 수를 가져옴
        const totalPosts = await Player.countDocuments();

        // 현재 페이지의 게시물을 가져옴
        const players = await Player.find()
            .sort({ type: -1 })
            .skip(skip)
            .limit(itemsPerPage);

        res.status(200).json({
            players,
            currentPage,
            totalPages: Math.ceil(totalPosts / itemsPerPage),
        });
    } catch (error) {
        res.status(500).json({ error: '게시물을 조회하는 중에 오류가 발생했습니다.' });
    }
};
