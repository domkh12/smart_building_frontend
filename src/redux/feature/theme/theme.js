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

            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: mode === 'dark' ? '#121212' : '#fafafa',
                        transition: 'background-color 0.3s ease'
                    }
                }
            },

            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInputBase-input": {
                            boxShadow: "none",
                        },
                        borderRadius: "9px"
                    }
                }
            },

            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "& .MuiInputBase-input": {
                            boxShadow: "none",
                        },
                        borderRadius: "9px"
                    }
                }
            },

            MuiTabPanel: {
                styleOverrides: {
                    root: {
                        padding: "24px 0px"
                    }
                }
            },

            MuiTabs: {
                styleOverrides: {
                    root: {
                        "& .MuiTabs-indicator": {
                            backgroundColor: mode === "dark" ? "#fff" : "#000",
                        }
                    }
                }
            },

            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontSize: "1rem",
                        "&.Mui-selected": {
                            color: mode === "dark" ? "#fff" : "#000",
                        },
                    }
                }
            },

            MuiButton: {
                styleOverrides: {
                    outlined:{
                        borderRadius: '8px',
                    },
                    contained: {
                        backgroundColor: deepPurple[600],
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: deepPurple[700],
                        },
                    },
                    root: {
                        textTransform: 'none',
                    }
                },
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        variants: [
                            {
                                style: {
                                    borderRadius: "14px",
                                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                    backgroundColor: mode === 'dark' ? '#1C252E' : '#fff',
                                    color: mode === 'dark' ? '#fff' : '#000',
                                    transition: 'all 0.3s ease',
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
