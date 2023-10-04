import React, { useState, useEffect } from 'react'
import { Pagination, Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
import Title from './DashBoard/Title';

function BettingList({ chekcedBettings, setCheckedBettings }) {
    const [isChanged, setIsChanged] = useState(false);
    return (
        <div>
            {chekcedBettings ?
                <>
                    <Container>
                        <Card className="mt-3 pt-3">
                            <Title>선수 관리</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>매치id</TableCell>
                                        <TableCell>승자 팀</TableCell>
                                        <TableCell>승자 예측</TableCell>
                                        <TableCell>배당</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chekcedBettings.map((row, index) => {
                                        return (
                                            <TableRow key={row.match_id}>
                                                <TableCell>{row.match_id}</TableCell>
                                                <TableCell>{row.selected_team}</TableCell>
                                                <TableCell>{row.player_name}</TableCell>
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