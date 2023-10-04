import React, { useState, useEffect } from 'react'
import { Pagination, Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Title from './DashBoard/Title';

function BettingList({ checkedBettings, setCheckedBettings }) {
    const [isChanged, setIsChanged] = useState(false);
    useEffect(()=>{
        console.log(checkedBettings)
    },[])
    return (
        <div>
            {checkedBettings ?
                <>
                    <Container>
                        <Card className="mt-3 pt-3">
                            <Title>선수 관리</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>승자 예측</TableCell>
                                        <TableCell>vs 상대방</TableCell>
                                        <TableCell>배당</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checkedBettings.map((row, index) => {
                                        return (
                                            <TableRow key={row.match_id}>
                                                <TableCell>{row.player_name}<CheckCircleIcon></CheckCircleIcon></TableCell>
                                                <TableCell>{row.opponent}</TableCell>
                                                <TableCell>{row.rate}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Card>
                    </Container>



                </>


                : <>베팅리스트가 비었습니다.</>}
        </div>
    )
}

export default BettingList