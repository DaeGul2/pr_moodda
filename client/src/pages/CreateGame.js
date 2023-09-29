import React, { useState, useEffect } from "react";
import { getAllPlayers } from "../api/playerAPI"; // 예를 들어, 선수 데이터를 가져오는 API 함수를 import
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
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
                console.log(players)

            })
            .catch((error) => {
                console.error("선수 데이터를 가져오는 중 오류 발생:", error);
            });
    }, []);

    const defaultProps = {
        options: players,
        getOptionLabel: (option) => `${option.player_name}-${option.player_tpz}(${option.player_tear} - ${option.player_uni})`,
    };

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
                        <Grid container spacing={2}>
                            <Grid item xs={5.5}>
                                <Item>
                                    <Paper>
                                        <Autocomplete
                                            {...defaultProps}
                                            id="auto-complete"
                                            autoComplete
                                            includeInputInList
                                            onChange={(e, newValue) => { console.log(newValue) }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Home" variant="standard" />
                                            )}
                                        />
                                    </Paper>
                                </Item>
                            </Grid>
                            <Grid item xs={1} display="flex" justifyContent="center" alignItems="center" >
                                <h2>vs</h2>
                            </Grid>
                            <Grid item xs={5.5}>
                                <Item>
                                    <Paper>
                                        <Autocomplete
                                            {...defaultProps}
                                            id="auto-complete"
                                            autoComplete
                                            onChange={(e, newValue) => { console.log(newValue) }}
                                            includeInputInList
                                            renderInput={(params) => (
                                                <TextField {...params} label="Away" variant="standard" />
                                            )}
                                        />
                                    </Paper>

                                </Item>
                            </Grid>

                        </Grid>
                        {/* 또 다른 홈팀과 어웨이팀 필드들을 추가할 수 있습니다 */}
                    </div>
                ))}
                <br />


            </div>
            : <>Loading...</>}</>

    );
}

export default CreateGame;
