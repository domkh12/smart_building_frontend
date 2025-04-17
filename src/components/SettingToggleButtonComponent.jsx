import {Button, styled, Switch, Typography} from "@mui/material";
import {FaCloudMoon} from "react-icons/fa";
import {useState} from "react";

function SettingToggleButtonComponent({title, handleChange, value}) {
    const [checked, setChecked] = useState(value);

    const handleToggle = () => {
        setChecked(prev => !prev);
        handleChange();
    };

    const AntSwitch = styled(Switch)(({theme}) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#1890ff',
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#177ddc',
                    }),
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
            ...theme.applyStyles('dark', {
                backgroundColor: 'rgba(255,255,255,.35)',
            }),
        },
    }));

    return (
        <>
            <Button onClick={handleToggle} sx={{
                width: "100%",
                textTransform: "none",
                padding: "16px 20px",
                backgroundColor: "#F5F5F5",
                display: "flex",
                gap: "10px",
                justifyContent: "start",
                alignItems: "start",
                borderRadius: "16px",
                border: "1px solid black",
                "&:hover": {
                    backgroundColor: "#E0E0E0"
                }
            }} disableRipple>
                <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-5">
                    <FaCloudMoon className="w-7 h-7"/>
                    <Typography variant="body2">{title}</Typography>
                </div>
                <AntSwitch checked={checked} inputProps={{'aria-label': 'ant design'}}
                />
                </div>
            </Button>
        </>
    );
}

export default SettingToggleButtonComponent;