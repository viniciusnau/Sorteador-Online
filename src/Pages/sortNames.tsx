import React, { useState } from 'react';
import {
    Container,
    TextField,
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
    Stack
} from '@mui/material';

const SortNames: React.FC = () => {
    const [showSorter1, setShowSorter1] = useState(false);
    const [showSorter2, setShowSorter2] = useState(false);

    const [input1, setInput1] = useState('');
    const [count1, setCount1] = useState(1);
    const [result1, setResult1] = useState<string[]>([]);

    const [input2, setInput2] = useState('');
    const [count2, setCount2] = useState(1);
    const [result2, setResult2] = useState<string[]>([]);

    const handleSort1 = () => {
        const names = input1.split('\n').map(n => n.trim()).filter(Boolean);
        if (count1 > names.length) {
            alert('Quantidade de sorteados não pode ser maior que o número de nomes!');
            return;
        }
        const shuffled = [...names].sort(() => 0.5 - Math.random());
        setResult1(shuffled.slice(0, count1));
    };

    const handleSort2 = () => {
        const names = input2.split('\n').map(n => n.trim()).filter(Boolean);
        if (count2 > names.length) {
            alert('Quantidade de sorteados não pode ser maior que o número de nomes!');
            return;
        }
        const shuffled = [...names].sort(() => 0.5 - Math.random());
        setResult2(shuffled.slice(0, count2));
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                        fullWidth
                        onClick={() => {
                            setShowSorter1(true);
                            setShowSorter2(false);
                        }}
                    >
                        Abrir Ordenador
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#cc2229', '&:hover': { backgroundColor: 'darkred' } }}
                        fullWidth
                        onClick={() => {
                            setShowSorter2(true);
                            setShowSorter1(false);
                        }}
                    >
                        Abrir Sorteador
                    </Button>
                </Grid>
            </Grid>

            {/* Sorteador Verde */}
            {showSorter1 && (
                <Box mt={4}>
                    <Paper elevation={3} sx={{ p: 4, width: '100%', border: '2px solid green' }}>
                        <Typography variant="h5" gutterBottom sx={{ color: 'green' }}>
                            Ordenador
                        </Typography>

                        <TextField
                            label="Lista de Nomes (um por linha)"
                            multiline
                            rows={6}
                            fullWidth
                            value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                            margin="normal"
                        />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    label="Quantidade a sortear"
                                    inputProps={{
                                        min: 1,
                                        max: input1.split('\n').filter(name => name.trim()).length || 1,
                                    }}
                                    fullWidth
                                    value={count1}
                                    onChange={(e) => setCount1(Number(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                                    onClick={handleSort1}
                                >
                                    Sortear
                                </Button>
                            </Grid>
                        </Grid>

                        {result1.length > 0 && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    Nomes Sorteados:
                                </Typography>
                                <List>
                                    {result1.map((name, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`${index + 1}. ${name}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Paper>
                </Box>
            )}

            {/* Sorteador Vermelho */}
            {showSorter2 && (
                <Box mt={4}>
                    <Paper elevation={3} sx={{ p: 4, width: '100%', border: '2px solid #cc2229' }}>
                        <Typography variant="h5" gutterBottom sx={{ color: '#cc2229' }}>
                            Sorteador
                        </Typography>

                        <TextField
                            label="Lista de Nomes (um por linha)"
                            multiline
                            rows={6}
                            fullWidth
                            value={input2}
                            onChange={(e) => setInput2(e.target.value)}
                            margin="normal"
                        />

                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    label="Quantidade a sortear"
                                    inputProps={{
                                        min: 1,
                                        max: input2.split('\n').filter(name => name.trim()).length || 1,
                                    }}
                                    fullWidth
                                    value={count2}
                                    onChange={(e) => setCount2(Number(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: '#cc2229', '&:hover': { backgroundColor: 'darkred' } }}
                                    onClick={handleSort2}
                                >
                                    Sortear
                                </Button>
                            </Grid>
                        </Grid>

                        {result2.length > 0 && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    Nomes Sorteados:
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
                                    {result2.map((name, index) => (
                                        <Chip key={index} label={name} sx={{ backgroundColor: '#cc2229', color: 'white' }} />
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Paper>
                </Box>
            )}
        </Container>
    );
};

export default SortNames;
