import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { Grid, Paper, Fab, Stack, Button, Box, ButtonGroup, Pagination } from '@mui/material'
import { styled } from '@mui/material/styles';
import { getGames, updateMatch, deleteGame, deleteMatch } from '../api/gameAPI';
import dayjs from 'dayjs';




function formatDate(inputDate) {
    const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm');
    return formattedDate;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



function Betting() {
    /**페이지네이션 */
    const [perPage, setPerPage] = useState(10);
    const [totalPlayerPage, setTotalPlayerPage] = useState(100);
    const [currentPlayerPage, setCurrentPlayerPage] = useState(1);
    const handleChange = (event, value) => {
        setCurrentPlayerPage(value);
    };
    /*---*/
    const [games, setGames] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    useEffect(() => {
        getGames(1, 10).then((res) => {
            setGames(res.data.games);
            setTotalPlayerPage(res.totalPages);
        })
    }, [isChanged])


    return (
        <Paper className='p-3'>


            {
                games ? <>
                    {games.map((game, index) => {
                        return (
                            <Card className='mb-5' key={game._id}>
                                <Stack className='p-2' direction={'column'} spacing={2}>
                                    <span><h2>{game.memo}</h2></span>
                                    <hr />
                                </Stack>
                                <span>
                                    {game.game_type === 'nvm' ? '단체전' : '개인전'}
                                </span>


                                {/* {--- 1 대전당 게임 리스트 ---} */}
                                {game.games.map((subGame, idx) => {
    const isBettingEnabled = subGame.result === 2;

    return (
        <Paper elevation={5} key={subGame._id}>
            <div className='mb-5' >
                <span>{isBettingEnabled ? <Chip label="시작 전" color="success" /> : subGame.result === 1 ? <Chip label="진행중" color="warning" /> : <Chip label="종료" color="error" />}</span>
                <span>{formatDate(subGame.createdAt) + " 생성됨"}</span>

                <Card className='gameCard'>
                    <Grid container spacing={2}>
                        <Grid item xs={5.5}>
                            <Item>
                                <p>배당 : {subGame.home.rate}</p>
                                <p> 홈 : {subGame.home.player_name}{`(${subGame.home.player_tear}, ${subGame.home.player_uni})`}</p>
                            </Item>
                        </Grid>
                        <Grid item xs={1} display="flex" justifyContent="center" alignItems="center" >
                            <h2>vs</h2>
                        </Grid>
                        <Grid item xs={5.5}>
                            <Item>
                                <p>배당 : {subGame.away.rate}</p>
                                <p> 어웨이 : {subGame.away.player_name}{`(${subGame.away.player_tear}, ${subGame.away.player_uni})`}</p>
                            </Item>
                        </Grid>
                    </Grid>
                    <Button disabled={!isBettingEnabled}>베팅</Button>
                </Card>
            </div>
        </Paper>
    )
})}

                            </Card>

                        )
                    })}
                    <Stack spacing={2}>
                        <Pagination count={totalPlayerPage} page={currentPlayerPage} onChange={handleChange} />
                    </Stack>
                </> : <>..Loading..</>
            }
        </Paper>
    )
}

export default Betting