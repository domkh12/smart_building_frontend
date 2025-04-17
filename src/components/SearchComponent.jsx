import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { textFieldStyle } from "../assets/style";
import useTranslate from "../hook/useTranslate";

function SearchComponent({ onSearchChange, value }) {
  const { t } = useTranslate();

  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    onSearchChange(inputValue);
  };

  return (
    <FormControl fullWidth>
      <OutlinedInput
        value={value}
        onChange={handleInputChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder={`${t("search")}...`}
        sx={{ ...textFieldStyle }}
      />
    </FormControl>
  );
}

export default SearchComponent;
