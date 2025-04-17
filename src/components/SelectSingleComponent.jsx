import { useState } from "react";
import { selectMenuStyle, selectStyle } from "../assets/style";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  ListSubheader,
} from "@mui/material";
import DataNotFound from "./DataNotFound";
import {useSelector} from "react-redux";

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
}) {
  const [valueSelect, setValueSelect] = useState("");
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

  const renderMenuItems = () => {
    if (!options || options?.length === 0) return <DataNotFound />;

    let menuItems = [];

    if (!groupLabelKey) {
      menuItems = options?.map((option) => (
        <MenuItem
          key={option.id}
          value={option.id}
          sx={{
            borderRadius: "5px",
          }}
        >
          {option[optionLabelKey]}
        </MenuItem>
      ));
    } else {
      options.forEach((group) => {
        menuItems.push(
          <ListSubheader
            key={group[groupLabelKey]}
            sx={{
              backgroundColor: "#D5D6E9",
              borderRadius: "5px",
              color: "#2C3092",
              pointerEvents: "none",
            }}
          >
            {group[groupLabelKey]}
          </ListSubheader>
        );

        const items = group[itemsLabelKey] || [];
        items.forEach((option) => {
          menuItems.push(
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                borderRadius: "5px",
              }}
            >
              {option[optionLabelKey]}
            </MenuItem>
          );
        });
      });
    }
    return menuItems;
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
        MenuProps={MenuProps}
        value={selectFistValue ? selectFistValue : valueSelect}
        onChange={handleChange}
        sx={{
          ...selectStyle,
          ...(hasError && {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f44336",
            },
          }),
        }}
      >
        {renderMenuItems()}
      </Select>
      <FormHelperText error={hasError}>
        {hasError ? error : null}
      </FormHelperText>
    </FormControl>
  );
}

export default SelectSingleComponent;
