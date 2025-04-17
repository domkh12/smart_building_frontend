import {createTheme} from '@mui/material/styles';
import {deepPurple, deepOrange} from '@mui/material/colors';

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode: mode,
            primary: {
                main: deepPurple[600],
            },
            secondary: {
                main: deepOrange[900],
            },
            ...(mode === 'dark'
                ? {
                    background: {
                        default: '#121212',
                        paper: '#141A21',
                    },
                }
                : {
                    background: {
                        default: '#fafafa',
                        paper: '#fff',
                    },
                }),
        },

        typography: {
            fontFamily: ['Roboto', 'Hanuman', 'Arial', 'sans-serif'].join(','),
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        backgroundColor: deepPurple[600],
                        borderRadius: '8px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: deepPurple[700],
                        },
                    },
                },
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                style: {
                                    backgroundColor: mode === 'dark' ? '#1C252E' : '#fff',
                                    color: mode === 'dark' ? '#fff' : '#000',
                                    borderRadius: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: 'none',
                                },
                            },
                        ],
                    },
                },
            },

            MuiIconButton: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                style: {
                                    backgroundColor: mode === 'dark' ? '#141A21' : '#fff',
                                    color: mode === 'dark' ? '#fff' : '#637381',
                                    transition: 'all 0.3s ease',
                                    "&:hover": {
                                        backgroundColor: mode === 'dark' ? '#1C252E' : '#f2f2f2',
                                    }
                                },
                            },
                        ],
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "0px"
                    }
                },
                defaultProps: {
                    elevation: 0,

                },

            },

            MuiList: {
                variants: [
                    {
                        props: {variant: 'customStyled'},
                        style: {
                            background: mode === 'dark' ? '#141A21' : "linear-gradient(to top right,#FFE4D6,#fff, #E0E0F6)",
                            color: mode === 'dark' ? '#fff' : '#637381',
                            borderRadius: "10px",
                            padding: "6px",
                            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                            marginTop: "0.5rem",
                            "& .MuiList-root": {
                                padding: "0",
                                display: "grid",
                                gap: "6px",
                                background: "transparent"
                            },
                        },
                    },
                ],
            },

            MuiTypography: {
                variants: [
                    {
                        props: {variant: 'description'},
                        style: {
                            color: mode === "dark" ? "#fff" : "#000",
                            opacity: mode === "dark" ? "80%" : "40%",
                            fontSize: "14px"
                        },
                    },
                ],
            },


        },
    });
