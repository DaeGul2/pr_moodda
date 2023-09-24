import { getPlayers } from "../api/playerAPI";
import { useState, useEffect } from 'react';
import * as React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import Title from './DashBoard/Title';
import Link from '@mui/material/Link';


function preventDefault(event) {
    event.preventDefault();
  }

function Admin() {
    const [players, setPlayers] = useState([]);
    const [currentPlayerPage, setCurrentPlayerPage] = useState(1);
    useEffect(() => {
        getPlayers(1, 10, -1).then((res) => {
            setPlayers(res.players);
        });
    }, [])

    return (
        <React.Fragment>
            <Title>선수 관리</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>티어</TableCell>
                        <TableCell>대학</TableCell>
                        <TableCell>종족</TableCell>
                        <TableCell>성별</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((row,index) => (
                        <TableRow key={row.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.player_name}</TableCell>
                            <TableCell>{row.player_tear}</TableCell>
                            <TableCell>{row.player_uni}</TableCell>
                            <TableCell>{row.player_tpz}</TableCell>
                            <TableCell >{row.sex=='f'?'여성':'남성'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <button>이전</button>
                <button>다음</button>
            </div>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    )
}

export default Admin