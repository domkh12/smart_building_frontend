import {useState, useEffect} from "react";
import {
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    ListItemText,
    MenuItem,
    FormHelperText,
    ListSubheader,
    TextField,
    InputAdornment,
} from "@mui/material";
import {selectStyle} from "../assets/style";
import {useSelector} from "react-redux";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import useTranslate from "../hook/useTranslate.jsx";
import DataNotFound from "./DataNotFound";

const SelectComponent = ({
    label,
    options,
    onChange,
    fullWidth,
    error,
    touched,
    optionLabelKey = "",
    groupLabelKey = "",
    itemsLabelKey = "items",
    value,
    width60,
    selectFistValue,
}) => {
    const [valueSelect, setValueSelect] = useState([]);
    const [selectedids, setSelectedids] = useState([]);
    const [searchText, setSearchText] = useState("");
    const mode = useSelector((state) => state.theme.mode);
    const { t } = useTranslate();

    useEffect(() => {
        if (selectFistValue) {
            if (options) {
                let initialValues = [];
                let initialids = [];
                if (groupLabelKey) {
                    options.forEach((group) => {
                        const items = group[itemsLabelKey] || [];
                        items.forEach((item) => {
                            if (selectFistValue.includes(item.id)) {
                                initialValues.push(item[optionLabelKey]);
                                initialids.push(item.id);
                            }
                        });
                    });
                } else {
                    initialValues = options
                        .filter((option) => selectFistValue.includes(option.id))
                        .map((option) => option[optionLabelKey]);
                    initialids = selectFistValue;
                }
                setValueSelect(initialValues);
                setSelectedids(initialids);
            }
        } else if (value && options) {
            let initialValues = [];
            let initialids = [];

            if (groupLabelKey) {
                options.forEach((group) => {
                    const items = group[itemsLabelKey] || [];
                    items.forEach((item) => {
                        if (value.includes(item.id)) {
                            initialValues.push(item[optionLabelKey]);
                            initialids.push(item.id);
                        }
                    });
                });
            } else {
                initialValues = options
                    .filter((option) => value.includes(option.id))
                    .map((option) => option[optionLabelKey]);
                initialids = value;
            }
            setValueSelect(initialValues);
            setSelectedids(initialids);
        }
    }, [
        value,
        options,
        optionLabelKey,
        groupLabelKey,
        itemsLabelKey,
        selectFistValue,
    ]);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filterOptions = (options, searchText) => {
        if (!searchText) return options;

        const searchLower = searchText.toLowerCase();

        if (!groupLabelKey) {
            return options?.filter(option =>
                option[optionLabelKey].toLowerCase().includes(searchLower)
            );
        } else {
            return options?.map(group => ({
                ...group,
                [itemsLabelKey]: group[itemsLabelKey]?.filter(item =>
                    item[optionLabelKey].toLowerCase().includes(searchLower)
                )
            })).filter(group =>
                group[groupLabelKey].toLowerCase().includes(searchLower) ||
                group[itemsLabelKey]?.length > 0
            );
        }
    };

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

    const hasError = Boolean(error && touched);

    const renderMenuItems = () => {
        if (!options || options?.length === 0) return <DataNotFound />;

        const filteredOptions = filterOptions(options, searchText);
        let menuItems = [];

        if (!groupLabelKey) {
            menuItems = filteredOptions?.map((option) => (
                <MenuItem
                    key={option.id}
                    value={option[optionLabelKey]}
                    sx={{
                        borderRadius: "5px",
                        height: "40px",
                        padding: "0",
                        "& .MuiTypography-root": {
                            fontSize: "15px",
                        },
                        paddingRight: "10px",
                    }}
                >
                    <Checkbox
                        disableRipple
                        checked={valueSelect.includes(option[optionLabelKey])}
                    />
                    <ListItemText primary={option[optionLabelKey]}/>
                </MenuItem>
            ));
        } else {
            filteredOptions?.forEach((group) => {
                const showGroup = searchText.toLowerCase() === '' ||
                    group[groupLabelKey].toLowerCase().includes(searchText.toLowerCase()) ||
                    group[itemsLabelKey]?.length > 0;

                if (showGroup) {
                    menuItems.push(
                        <ListSubheader
                            variant="cus1"
                            key={group[groupLabelKey]}
                        >
                            {group[groupLabelKey]}
                        </ListSubheader>
                    );

                    const items = group[itemsLabelKey] || [];
                    items?.forEach((option) => {
                        menuItems.push(
                            <MenuItem
                                key={option.id}
                                value={option[optionLabelKey]}
                                sx={{
                                    borderRadius: "5px",
                                    height: "40px",
                                    padding: "0",
                                    "& .MuiTypography-root": {
                                        fontSize: "15px",
                                    },
                                    paddingRight: "10px",
                                }}
                            >
                                <Checkbox
                                    disableRipple
                                    checked={valueSelect.includes(option[optionLabelKey])}
                                />
                                <ListItemText primary={option[optionLabelKey]}/>
                            </MenuItem>
                        );
                    });
                }
            });
        }
        
        return menuItems.length > 0 ? menuItems : <DataNotFound />;
    };

    const handleChange = (event) => {
        const selectedValues = event.target.value;
        let selectedidsArray = [];

        if (groupLabelKey) {
            options.forEach((group) => {
                const items = group[itemsLabelKey] || [];
                items.forEach((item) => {
                    if (selectedValues.includes(item[optionLabelKey])) {
                        selectedidsArray.push(item.id);
                    }
                });
            });
        } else {
            selectedidsArray = options
                .filter((option) => selectedValues.includes(option[optionLabelKey]))
                .map((option) => option.id);
        }

        setValueSelect(selectedValues);
        setSelectedids(selectedidsArray);
        onChange(selectedidsArray);
    };

    return (
        <FormControl
            className={`flex-none  ${width60 && "lg:w-60"} w-full`}
            error={hasError}
            fullWidth={false}
        >
            <InputLabel id={label + "_label"} error={hasError}>
                {label}
            </InputLabel>
            <Select
                labelId={label + "_label"}
                id={label}
                label={label}
                multiple
                value={valueSelect}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
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
};

export default SelectComponent;