import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { FaTrashCan } from "react-icons/fa6";

function FilterResultsSummary({
  displayTotalElements,
  searchQuery,
  onClearFilter,
  clearFilterButtonText = "Clear",
}) {
  return (
    <div className="pl-[20px] pb-[20px]">
      <p>
        <span className="font-bold">{displayTotalElements}</span>
        <span className="text-light-gray text-sm">{`${"\u00a0"}result found`}</span>
      </p>

      <div className="flex items-center gap-5  mt-3">
        {searchQuery && (
          <div className="p-2 rounded-[7px] border-dashed border w-fit">
            <div>
              <span className="font-medium mr-2">Keyword:</span>
              <Chip
                size="small"
                sx={{ borderRadius: "8px" }}
                label={searchQuery}
                onDelete={onClearFilter}
              />
            </div>
          </div>
        )}

        {searchQuery && (
          <Button
            onClick={onClearFilter}
            sx={{ borderRadius: "8px" }}
            color="error"
            startIcon={<FaTrashCan />}
          >
            {clearFilterButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default FilterResultsSummary;
