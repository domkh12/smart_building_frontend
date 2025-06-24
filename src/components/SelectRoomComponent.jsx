import { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import DataNotFound from "./DataNotFound";
import useTranslate from "../hook/useTranslate.jsx";

function SelectRoomComponent({
                               label,
                               options,
                               onChange,
                               className,
                               fullWidth,
                               error,
                               touched,
                               optionLabelKey = "name",
                               floorLabel = "",
                               buildingLabel = "",
                               selectFistValue,
                             }) {
  const [valueSelect, setValueSelect] = useState("");
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslate();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const hasError = error && touched;

  const handleChange = (event) => {
    setValueSelect(event.target.value);
    onChange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filterOptions = (options, searchText) => {
    if (!searchText) return options;
    const searchLower = searchText.toLowerCase();
    return options.filter(option => {
      const labelMatch = option[optionLabelKey]?.toLowerCase().includes(searchLower);
      const floorMatch = floorLabel && option[floorLabel]?.name?.toLowerCase().includes(searchLower);
      const buildingMatch = buildingLabel && option[floorLabel]?.building?.name?.toLowerCase().includes(searchLower);
      return labelMatch || floorMatch || buildingMatch;
    });
  };

  const getOptionDisplayText = (option) => {
    let displayText = option[optionLabelKey] || "";
    const labels = [];
    if (floorLabel && option[floorLabel]?.name) labels.push(option[floorLabel].name);
    if (buildingLabel && option[floorLabel]?.building?.name) labels.push(option[floorLabel].building.name);
    if (labels.length > 0) {
      displayText += ` (${labels.join(", ")})`;
    }
    return displayText;
  };

  const renderMenuItems = () => {
    if (!options || options.length === 0) return <DataNotFound />;

    const filteredOptions = filterOptions(options, searchText);

    if (filteredOptions.length === 0) return <DataNotFound />;

    return filteredOptions.map((option) => (
        <MenuItem
            key={option?.id}
            value={option?.id}
            sx={{
              borderRadius: "5px",
            }}
        >
          <div className="flex items-center">
            {getOptionDisplayText(option)}
          </div>
        </MenuItem>
    ));
  };

  // Ensure the value exists in options before using it
  const currentValue = selectFistValue || valueSelect;
  const isValidValue = options?.some(option => option.id === currentValue);

  return (
      <FormControl
          className={className}
          fullWidth={fullWidth}
          error={hasError}
          sx={{ border: "transparent", outline: "none" }}
      >
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
            value={isValidValue ? currentValue : ""}
            onChange={handleChange}
            renderValue={(value) => {
              const selectedOption = options?.find(option => option.id === value);
              return selectedOption ? getOptionDisplayText(selectedOption) : '';
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.MuiOutlinedInput-root": {
                borderColor: "transparent",
                bgcolor: "transparent",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover": {
                  borderColor: "transparent",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&.Mui-focused": {
                  borderColor: "transparent",
                },
              },
              "& .MuiSelect-select": {
                padding: "0",
              },
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

export default SelectRoomComponent;

// import { useState } from "react";
// import {
//   FormControl,
//   MenuItem,
//   Select,
//   FormHelperText,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
// import DataNotFound from "./DataNotFound";
// import useTranslate from "../hook/useTranslate.jsx";
//
// function SelectRoomComponent({
//   label,
//   options,
//   onChange,
//   className,
//   fullWidth,
//   error,
//   touched,
//   optionLabelKey = "label",
//   selectFistValue,
// }) {
//   const [valueSelect, setValueSelect] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const { t } = useTranslate();
//
//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
//       },
//     },
//   };
//
//   const hasError = error && touched;
//
//   const handleChange = (event) => {
//     setValueSelect(event.target.value);
//     onChange(event.target.value);
//   };
//
//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };
//
//   const filterOptions = (options, searchText) => {
//     if (!searchText) return options;
//     const searchLower = searchText.toLowerCase();
//     return options.filter(option =>
//       option[optionLabelKey].toLowerCase().includes(searchLower)
//     );
//   };
//
//   const renderMenuItems = () => {
//     if (!options || options.length === 0) return <DataNotFound />;
//
//     const filteredOptions = filterOptions(options, searchText);
//
//     if (filteredOptions.length === 0) return <DataNotFound />;
//
//     return filteredOptions.map((option) => (
//       <MenuItem
//         key={option?.id}
//         value={option?.id}
//         sx={{
//           borderRadius: "5px",
//         }}
//       >
//         <div className="flex items-center">
//           {option[optionLabelKey]}
//         </div>
//       </MenuItem>
//     ));
//   };
//
//   // Ensure the value exists in options before using it
//   const currentValue = selectFistValue || valueSelect;
//   const isValidValue = options?.some(option => option.id === currentValue);
//
//   return (
//     <FormControl
//       className={className}
//       fullWidth={fullWidth}
//       error={hasError}
//       sx={{ border: "transparent", outline: "none" }}
//     >
//       <Select
//         labelId={`${label}_label`}
//         id={label}
//         label={label}
//         MenuProps={{
//           ...MenuProps,
//           autoFocus: false,
//           disableAutoFocus: true,
//           disableEnforceFocus: true
//         }}
//         value={isValidValue ? currentValue : ""}
//         onChange={handleChange}
//         renderValue={(value) => {
//           const selectedOption = options?.find(option => option.id === value);
//           return selectedOption ? selectedOption[optionLabelKey] : '';
//         }}
//         sx={{
//           "& .MuiOutlinedInput-notchedOutline": {
//             borderColor: "transparent",
//           },
//           "&.MuiOutlinedInput-root": {
//             borderColor: "transparent",
//             bgcolor: "transparent",
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: "transparent",
//             },
//             "&:hover": {
//               borderColor: "transparent",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: "transparent",
//             },
//             "&.Mui-focused": {
//               borderColor: "transparent",
//             },
//           },
//           "& .MuiSelect-select": {
//             padding: "0",
//           },
//         }}
//       >
//         <div>
//           <TextField
//             size="small"
//             variant="outlined"
//             placeholder={t('search')}
//             value={searchText}
//             onChange={handleSearchChange}
//             autoFocus
//             onClick={(event) => {
//               event.stopPropagation();
//             }}
//             onKeyDown={(event) => {
//               event.stopPropagation();
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchTwoToneIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               margin: "8px",
//               width: "calc(100% - 16px)",
//             }}
//           />
//         </div>
//         {renderMenuItems()}
//       </Select>
//       <FormHelperText error={hasError}>
//         {hasError ? error : null}
//       </FormHelperText>
//     </FormControl>
//   );
// }
//
// export default SelectRoomComponent;