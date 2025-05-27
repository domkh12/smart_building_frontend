import { useState } from "react";
import { selectStyle } from "../assets/style";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
    ListSubheader,
    IconButton,
    TextField,
    InputAdornment,
} from "@mui/material";
import DataNotFound from "./DataNotFound";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa6";
import useTranslate from "../hook/useTranslate.jsx";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

function SelectSingleComponent({
    label,
    options,
    onChange,
    className,
    fullWidth,
    error,
    touched,
    optionLabelKey = "label",
    groupLabelKey = "",
    itemsLabelKey = "items",
    selectFistValue,
    isEditable = false,
    onClickQuickEdit
}) {
    const [valueSelect, setValueSelect] = useState("");
    const [searchText, setSearchText] = useState("");
    const { t } = useTranslate();
    const mode = useSelector((state) => state.theme.mode);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        sx: {
            "& .MuiPaper-root": {
                background: mode === "dark" ? "#141A21" : "linear-gradient(to top right,#FFE4D6,#fff, #E0E0F6)",
                borderRadius: "10px",
                padding: "6px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                marginTop: "0.5rem",
            },
            "& .MuiList-root": {
                padding: "0",
                display: "grid",
                gap: "6px",
            },
        },
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: "auto",
            },
        },
    };

    const hasError = error && touched;

    const handleChange = (event) => {
        setValueSelect(event.target.value);
        onChange(event.target.value);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchText(value);
    };

    const filterOptions = (options, searchText) => {
        if (!searchText) return options;

        const searchLower = searchText.toLowerCase();

        if (!groupLabelKey) {
            return options.filter(option =>
                option[optionLabelKey].toLowerCase().includes(searchLower)
            );
        } else {
            return options.map(group => ({
                ...group,
                [itemsLabelKey]: group[itemsLabelKey].filter(item =>
                    item[optionLabelKey].toLowerCase().includes(searchLower)
                )
            })).filter(group =>
                // Show group if either group label matches or any items match
                group[groupLabelKey].toLowerCase().includes(searchLower) ||
                group[itemsLabelKey].length > 0
            );
        }
    };


    const renderMenuItems = () => {
        if (!options || options?.length === 0) return <DataNotFound />;

        const filteredOptions = filterOptions(options, searchText);
        let menuItems = [];

        if (!groupLabelKey) {
            menuItems = filteredOptions?.map((option) => (
                <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                        borderRadius: "5px",
                        position: "relative",
                    }}
                >
                    {option[optionLabelKey]}
                    {isEditable && (
                        <IconButton
                            size="small"
                            onClick={(event) => {
                                event.stopPropagation();
                                onClickQuickEdit(option.id);
                            }}
                            sx={{
                                position: "absolute",
                                right: "7px",
                                top: "7px"
                            }}
                        >
                            <FaPen className="w-3 h-3" />
                        </IconButton>
                    )}
                </MenuItem>
            ));
        } else {
            filteredOptions.forEach((group) => {
                const showGroup = searchText.toLowerCase() === '' ||
                    group[groupLabelKey].toLowerCase().includes(searchText.toLowerCase()) ||
                    group[itemsLabelKey].length > 0;

                if (showGroup) {
                    menuItems.push(
                        <ListSubheader
                            key={group[groupLabelKey]}
                            variant="cus1"
                        >
                            {group[groupLabelKey]}
                        </ListSubheader>
                    );

                    // Only show items if we're not specifically matching the group label
                    if (!searchText || !group[groupLabelKey].toLowerCase().includes(searchText.toLowerCase())) {
                        group[itemsLabelKey].forEach((option) => {
                            menuItems.push(
                                <MenuItem
                                    key={option.id}
                                    value={option.id}
                                    sx={{
                                        borderRadius: "5px",
                                        position: "relative",
                                    }}
                                >
                                    {option[optionLabelKey]}
                                    {isEditable && (
                                        <IconButton
                                            size="small"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onClickQuickEdit(option.id);
                                            }}
                                            sx={{
                                                position: "absolute",
                                                right: "7px",
                                                top: "7px"
                                            }}
                                        >
                                            <FaPen className="w-3 h-3" />
                                        </IconButton>
                                    )}
                                </MenuItem>
                            );
                        });
                    }
                }
            });
        }

        return menuItems.length > 0 ? menuItems : <DataNotFound />;
    };


    return (
        <FormControl className={className} fullWidth={fullWidth} error={hasError}>
            <InputLabel id={`${label}_label`} error={hasError}>
                {label}
            </InputLabel>
            <Select
                labelId={`${label}_label`}
                id={label}
                label={label}
                MenuProps={{
                    ...MenuProps,
                    autoFocus: false,
                    disableAutoFocus: true,
                    disableEnforceFocus: true
                }}
                value={selectFistValue ? selectFistValue : valueSelect}
                onChange={handleChange}
                renderValue={(value) => {
                    // For grouped options
                    if (groupLabelKey) {
                        const selectedOption = options.reduce((found, group) => {
                            if (found) return found;
                            return group[itemsLabelKey]?.find(item => item.id === value);
                        }, null);
                        return selectedOption ? selectedOption[optionLabelKey] : '';
                    }
                    // For non-grouped options
                    const selectedOption = options?.find(option => option.id === value);
                    return selectedOption ? selectedOption[optionLabelKey] : '';
                }}

                sx={{
                    ...selectStyle,
                    ...(hasError && {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f44336",
                        },
                    }),
                }}
            >
                <div>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder={t('search')}
                        value={searchText}
                        onChange={handleSearchChange}
                        autoFocus
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        onKeyDown={(event) => {
                            event.stopPropagation();
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            margin: "8px",
                            width: "calc(100% - 16px)",
                        }}
                    />
                </div>
                {renderMenuItems()}
            </Select>
            <FormHelperText error={hasError}>
                {hasError ? error : null}
            </FormHelperText>
        </FormControl>
    );
}

export default SelectSingleComponent;