const Player = require('../models/playerModel'); // Post 모델을 가져옵니다.

exports.getAllPlayers = async (req, res) => {
    try {
        const { page, perpage,updown } = req.query; // 쿼리 파라미터에서 page와 perpage를 추출
        console.log(req.query);
        const currentPage = parseInt(page) || 1; // 현재 페이지 (기본값: 1)
        const itemsPerPage = parseInt(perpage) || 10; // 페이지당 항목 수 (기본값: 10)
        const Updown = parseInt(updown)||1;
   

        const skip = (currentPage - 1) * itemsPerPage; // 건너뛸 항목 수 계산

        // 총 게시물 수를 가져옴
        const totalPosts = await Player.countDocuments();

        // 현재 페이지의 게시물을 가져옴
        const players = await Player.find()
            .sort({ player_name: Updown })
            .skip(skip)
            .limit(itemsPerPage);

        res.status(200).json({
            players,
            currentPage,
            totalPages: Math.ceil(totalPosts / itemsPerPage),
        });
    } catch (error) {
        res.status(500).json({ error: '/getAllPlayers 조회하는 중에 오류가 발생했습니다.' });
    }
};


exports.getEveryPlayers = async (req, res) => {
    try {
        
        const players = await Player.find()
           
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: '/getEveryPlayers 조회하는 중에 오류가 발생했습니다.' });
    }
};

exports.updatePlayer = async(req,res)=>{
    try {
        const { player_id } = req.params; // URL에서 게임 ID를 가져옵니다.
        const {player_uni, player_tear, player_tpz } = req.body;
    
        // 게임 업데이트
        const updatedPlayer = await Player.findByIdAndUpdate(
          player_id, // 업데이트할 게임의 ID
          {player_uni, player_tear, player_tpz },
          { new: true } // 업데이트된 게임 데이터를 반환하기 위해 new 옵션을 사용합니다.
        );
    
        if (!updatedPlayer) {
          return res.status(404).json({ error: '플레이어를 찾을 수 없습니다.' });
        }
    
        res.status(200).json(updatedPlayer);
      } catch (error) {
        res.status(500).json({ error: '플레이어를 업데이트하는 중에 오류가 발생했습니다.' });
      }
}
