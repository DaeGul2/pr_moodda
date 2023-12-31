import { getPlayers, getAllPlayers } from "../api/playerAPI";
import { useState, useEffect } from 'react';
import * as React from 'react';
import {Pagination ,Card, Container, Table, TableBody, TableCell, TableHead, TableRow,Stack } from '@mui/material';
import Title from './DashBoard/Title';
import Link from '@mui/material/Link';





function preventDefault(event) {
    event.preventDefault();
}

function Admin() {
    const [rawData, setRawData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [players, setPlayers] = useState([]);
    const [totalPlayerPage, setTotalPlayerPage] = useState(100);
    const [currentPlayerPage, setCurrentPlayerPage] = useState(1);
    useEffect(() => {
        getAllPlayers()
            .then((res) => {
                console.log('rawdata', res);
                setRawData(res)
            })
    }, [])
    useEffect(() => {
        getPlayers(currentPlayerPage, perPage, -1).then((res) => {
            setTotalPlayerPage(res.totalPages);
            setPlayers(res.players);
            if (currentPlayerPage === 0) {
                setCurrentPlayerPage(1);
            }
            if (currentPlayerPage > totalPlayerPage) {
                setCurrentPlayerPage(totalPlayerPage - 1);
            }
        });
    }, [currentPlayerPage]);
    useEffect(() => {
        console.log('test');
    }, [])

    const handleChange = (event, value) => {
        setCurrentPlayerPage(value);
      };

    return (
        <React.Fragment>
            <Container>
                <Card className="mt-3 pt-3">
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
                            {players.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.player_name}</TableCell>
                                    <TableCell>{row.player_tear}</TableCell>
                                    <TableCell>{row.player_uni}</TableCell>
                                    <TableCell>{row.player_tpz}</TableCell>
                                    <TableCell >{row.sex == 'f' ? '여성' : '남성'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Stack spacing={2}>
                        
                        <Pagination count={totalPlayerPage} page={currentPlayerPage} onChange={handleChange} />
                    </Stack>
                    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                        See more orders
                    </Link>

                   
                </Card>
            </Container>

        </React.Fragment>
    )
}

export default Admin