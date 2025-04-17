import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { selectMenuStyle, selectStyle } from "../assets/style";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

function TreeViewSelectComponent({
  label,
  options,
  onChange,
  fullWidth,
  error,
  touched,
  optionLabelKey = "label",
  groupLabelKey = "",
  itemsLabelKey = "items",
  selectFistValue = "",
}) {
  const [valueSelect, setValueSelect] = useState(selectFistValue);

  console.log("valueSelect", valueSelect);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    sx: {
      ...selectMenuStyle,
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
    console.log("event.target.value", event);
    onChange(event.target.value);
  };

  const renderTreeItems = () => {
    if (!options || options.length === 0) return null;

    let treeItems = [];

    if (!groupLabelKey) {
      treeItems = options.map((option) => (
        <MenuItem
          key={option.uuid}
          value={option.uuid}
          onClick={handleChange}
          sx={{ paddingLeft: "30px" }}
        >
          {option[optionLabelKey]}
        </MenuItem>
      ));
    } else {
      options.forEach((group) => {
        const groupItems = group[itemsLabelKey] || [];

        treeItems.push(
          <TreeItem
            key={group[groupLabelKey]}
            itemId={group[groupLabelKey]}
            label={group[groupLabelKey]}
          >
            {groupItems.map((item) => (
              <MenuItem
                key={item.uuid}
                value={item.uuid}
                onClick={handleChange}
                sx={{ paddingLeft: "60px" }}
              >
                {item[optionLabelKey]}
              </MenuItem>
            ))}
          </TreeItem>
        );
      });
    }

    return treeItems;
  };

  return (
    <FormControl fullWidth={fullWidth} error={hasError}>
      <InputLabel id={`${label}_label`} error={hasError}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}_label`}
        id={label}
        label={label}
        MenuProps={MenuProps}
        value={selectFistValue ? selectFistValue : valueSelect}
        sx={{
          ...selectStyle,
          ...(hasError && {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f44336",
            },
          }),
        }}
      >
        <ListSubheader sx={{ backgroundColor: "transparent", p: 0 }}>
          <Box sx={{ minWidth: 250 }}>
            <SimpleTreeView sx={{ minWidth: "0" }}>
              {renderTreeItems()}
            </SimpleTreeView>
          </Box>
        </ListSubheader>
      </Select>
      <FormHelperText error={hasError}>
        {hasError ? error : null}
      </FormHelperText>
    </FormControl>
  );
}

export default TreeViewSelectComponent;
