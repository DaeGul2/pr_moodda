import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { Grid, Paper, Fab, Stack, Button, Box, ButtonGroup, Pagination } from '@mui/material'
import { styled } from '@mui/material/styles';
import { getGames, updateMatch, deleteGame, deleteMatch } from '../api/gameAPI';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import UpdateGame from './UpdateGame';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



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



function GameAdmin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gameType, setGameType] = useState(2);
  const [toUpdateData, setToUpdateData] = useState(null);
  const [toUpdateGameId, setToUpdateGameId] = useState(null);
  const [toUpdateMatchId, setToUpdateMatchId] = useState(null);
  const [toUpdatePlayerId, setToUpdatePlayerid] = useState(null);
  const [toUpdateRate, setToUpdateRate] = useState(null);
  const [games, setGames] = useState(null);

  /**페이지네이션 */
  const [perPage, setPerPage] = useState(10);
  const [totalPlayerPage, setTotalPlayerPage] = useState(100);
  const [currentPlayerPage, setCurrentPlayerPage] = useState(1);
  const handleChange = (event, value) => {
    setCurrentPlayerPage(value);
  };
  /*---*/



  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    getGames(currentPlayerPage, perPage).then((res) => {
      setGames(res.data.games);
      setTotalPlayerPage(res.totalPages);
    })
  }, [isChanged])


  const updateStatus = (gameId, matchId, type) => {
    // 경기를 시작 전으로 바꿈 (베팅 가능하게 바꿈)
    try {
      updateMatch(gameId, matchId, { result: type })
        .then((res) => {
          console.log(res);
          alert('업데이트 성공');
          setIsChanged(!isChanged);
        })
        .catch(e => alert(e));
    }
    catch (e) {
      alert(e);
    }
  }


  const delGame = (gameId) => {
    try {
      deleteGame(gameId).then(res => console.log(res)).catch(e => alert(e));
      alert('삭제되었습니다.');
      setIsChanged(!isChanged);
      return;
    }
    catch (error) {
      alert(error);
    }
  }

  const delMatch = (gameId, matchId) => {
    try {
      deleteMatch(gameId, matchId).then(res => console.log(res)).catch(e => alert(e))
      alert('삭제되었습니다.');
      setIsChanged(!isChanged);
      return;
    }
    catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 1000 }}>
          <UpdateGame data={toUpdateData} matchId={toUpdateMatchId} gameId={toUpdateGameId} playerInfo={toUpdatePlayerId} rateInfo={toUpdateRate}></UpdateGame>
        </Box>
      </Modal>
      <br />
      <Link to='/creategame'>
        <Fab color="primary" aria-label="add">
          대전<AddIcon />
        </Fab>
      </Link>

      {
        games ? <>
          {games.map((game, index) => {
            return (
              <Card className='mb-5' key={game._id}>
                <Stack direction={'column'} spacing={2}>
                  <span><h2>{game.memo}</h2></span>
                  <span>
                    <IconButton  onClick={() => { delGame(game._id) }} color="error" aria-label="delete" size="large">
                      <DeleteIcon />
                    </IconButton>
                  </span>
                  <hr />
                </Stack>
                <span>
                  {game.game_type === 'nvm' ? '단체전' : '개인전'}
                </span>


                {/* {--- 1 대전당 게임 리스트 ---} */}
                {game.games.map((subGame, idx) => {
                  return (
                    <Paper elevation={5} key={subGame._id}>
                      <div className='mb-5' >
                        <span>{subGame.result === 2 ? <><Chip label="시작 전" color="success" />  </> : subGame.result === 1 ? <><Chip label="진행중" color="warning" /> </> : <><Chip label="종료" color="error" /> </>}</span>
                        <span>{formatDate(subGame.createdAt) + " 생성됨"}</span>
                        <span>{subGame.isPayed ? <Chip label="정산완료" color="success"></Chip> : <Chip label="미정산" color="error"></Chip>}</span>

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
                          <Button onClick={() => { delMatch(game._id, subGame._id) }} variant='outlined' color="error" aria-label="delete">
                            매치 삭제
                          </Button>
                          <Button onClick={async () => {
                            setToUpdateData(subGame);
                            setToUpdateGameId(game._id);
                            setToUpdateMatchId(subGame._id)
                            setToUpdatePlayerid({ home: subGame.home._id, away: subGame.away._id })
                            setToUpdateRate({ home: subGame.home.rate, away: subGame.away.rate })
                            handleOpen();
                          }} variant='outlined' color="success" aria-label="delete">
                            매치 수정
                          </Button>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => { updateStatus(game._id, subGame._id, 1) }}>경기중</Button>
                            <Button color='success' onClick={() => { updateStatus(game._id, subGame._id, 2) }}>시작 전</Button>
                            <Button color='error' onClick={() => { updateStatus(game._id, subGame._id, 0) }}>종료</Button>
                          </ButtonGroup>

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
    </>
  )
}

export default GameAdmin