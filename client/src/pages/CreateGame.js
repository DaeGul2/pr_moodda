import React, { useState, useEffect } from "react";
import { getAllPlayers } from "../api/playerAPI"; // 예를 들어, 선수 데이터를 가져오는 API 함수를 import

function CreateGame() {
    const initialGame = {
        home: {
            _id: "",
            player_name: "",
            player_uni: "",
            player_tear: "",
            player_tpz: "",
            sex: "",
            rate: 1.0,
        },
        away: {
            _id: "",
            player_name: "",
            player_uni: "",
            player_tear: "",
            player_tpz: "",
            sex: "",
            rate: 1.0,
        },
    };

    const [formData, setFormData] = useState({
        game_type: "nvm",
        memo: "최신",
        games: [initialGame],
    });

    const handleAddGame = () => {
        setFormData({
            ...formData,
            games: [...formData.games, initialGame],
        });
    };

    const handleGameChange = (event, index, team, field) => {
        const newValue = event.target.value;
        setFormData((prevData) => {
            const updatedGames = [...prevData.games];
            updatedGames[index][team][field] = newValue;
            return { ...prevData, games: updatedGames };
        });
    };

    const [players, setPlayers] = useState(null);
    const [gameType, setGameType] = useState("1v1");

    useEffect(() => {
        // 선수 데이터를 비동기적으로 가져옴 (예: getPlayers 함수 사용)
        getAllPlayers()
            .then((data) => {
                
                // 가져온 선수 데이터를 players 상태에 설정
                setPlayers(data);
            })
            .catch((error) => {
                console.error("선수 데이터를 가져오는 중 오류 발생:", error);
            });
    }, []);

    return (
        <>{players ?
            <div>
                <h2>게임 정보 입력</h2>
                <label>
                    Game Type:
                    <select
                        value={formData.game_type}
                        onChange={(e) =>
                            setFormData({ ...formData, game_type: e.target.value })
                        }
                    >
                        <option value="1v1">일대일</option>
                        <option value="nvm">다대다</option>
                    </select>
                </label>
                <br />
                <label>
                    Memo:
                    <input
                        type="text"
                        value={formData.memo}
                        onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                    />
                </label>
                <br />
                <button onClick={handleAddGame}>+ 추가</button>
                <br />
                {formData.games.map((game, index) => (
                    <div key={index}>
                        <label>
                            홈팀 선수 이름:
                            <select
                                value={game.home.player_name}
                                onChange={(e) =>
                                    handleGameChange(e, index, "home", "player_name")
                                }
                            >
                                {/* 선수 데이터를 옵션으로 표시 */}
                                {players.map((player) => (
                                    <option key={player._id} value={player.player_name}>
                                        {player.player_name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            어웨이팀 선수 이름:
                            <input
                                type="text"
                                value={game.away.player_name}
                                onChange={(e) => handleGameChange(e, index, "away", "player_name")}
                            />
                        </label>
                        <label>
                            레이팅:
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={game.home.rate}
                                onChange={(e) => handleGameChange(e, index, "home", "rate")}
                            />
                        </label>
                        {/* 또 다른 홈팀과 어웨이팀 필드들을 추가할 수 있습니다 */}
                    </div>
                ))}
                <br />
                {/* 폼 제출 버튼과 이벤트 핸들러를 추가하세요 */}
            </div>
            : <>Loading...</>}</>

    );
}

export default CreateGame;
