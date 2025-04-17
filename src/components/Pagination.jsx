import { useEffect, useRef, useState } from "react";
import {
  PiCaretDownThin,
  PiCaretLeftThin,
  PiCaretLineLeftThin,
  PiCaretLineRightThin,
  PiCaretRightThin,
} from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setIsPaginationSuccess } from "../redux/feature/actions/actionSlice";
import { decreasePageNo, increasePageNo } from "../redux/feature/users/userSlice";

function Pagination({ pageSize, pageNo, totalPages, totalElements }) {
  useEffect(() => {
    console.log(`Page Number: ${pageNo}`);
    console.log(`Page Size: ${pageSize}`);
    console.log(`Total Pages: ${totalPages}`);
    console.log(`Total Elements: ${totalElements}`);
  }, [pageNo, pageSize, totalPages, totalElements]);
  const dispatch = useDispatch();
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const pageSizeRef = useRef(null);

  const toggleDropdown = () => {
    setIsPageSizeOpen((prev) => !prev);
  };

  const handleNextPagination = async () => {
    dispatch(increasePageNo());
    dispatch(setIsPaginationSuccess(true));
  };

  const handleBackPagination = async () => {
    dispatch(decreasePageNo());
    dispatch(setIsPaginationSuccess(true));
  };

  const handleResetPagination = async () => {
    dispatch(resetPageNo());
    dispatch(setIsPaginationSuccess(true));
  };

  const handleLastPagination = async () => {
    dispatch(lastPageNo());
    dispatch(setIsPaginationSuccess(true));
  };

  const handleSetPageSize = (size) => {
    if ([10, 30, 50].includes(size)) {
      dispatch(setPageSize(size));
    } else {
      console.error("Invalid page size:", size);
    }
  };

  const calculateItemRange = () => {
    const startItem = (pageNo - 1) * pageSize + 1;
    const endItem = Math.min(pageNo * pageSize, totalElements);
    return `${startItem}-${endItem}`;
  };

  useEffect(() => {
    setIsPageSizeOpen(false);
    dispatch(setIsPaginationSuccess(true));
  }, [pageNo, pageSize]);

  useEffect(() => {
    dispatch(setTotalPages(totalPages));
  }, [totalPages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pageSizeRef.current && !pageSizeRef.current.contains(event.target)) {
        setIsPageSizeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="flex justify-end items-center gap-4">
      <div className="text-gray-500">
        <p>Rows per page: </p>
      </div>
      <div className="relative" ref={pageSizeRef}>
        <button
          className="hover:bg-gray-200 p-2 rounded-lg flex justify-center items-center gap-4"
          onClick={toggleDropdown}
        >
          <span className="text-gray-900 ml-3">{pageSize}</span>
          <PiCaretDownThin className="h-5 w-5" />
        </button>
        {isPageSizeOpen && (
          <div className="w-full h-28 absolute bottom-0 left-0 rounded-lg bg-gray-50 shadow-md border-[1px] flex flex-col justify-between items-center py-2">
            <button
              className="hover:bg-gray-200 w-full py-1 h-full"
              onClick={() => handleSetPageSize(10)}
            >
              10
            </button>
            <button
              className="hover:bg-gray-200 w-full py-1 h-full"
              onClick={() => handleSetPageSize(30)}
            >
              30
            </button>
            <button
              className="hover:bg-gray-200 w-full py-1 h-full"
              onClick={() => handleSetPageSize(50)}
            >
              50
            </button>
          </div>
        )}
      </div>

      <div className="text-gray-500 text-sm">
        <p>
          {calculateItemRange()} of about {totalPages}
        </p>
      </div>
      <button
        className={`p-2 rounded-full ${
          pageNo === 1 ? "opacity-50 cursor-default" : "hover:bg-gray-200 "
        }`}
        disabled={pageNo === 1}
        onClick={handleResetPagination}
      >
        <PiCaretLineLeftThin className="h-5 w-5" />
      </button>
      <button
        className={`p-2 rounded-full ${
          pageNo === 1 ? "opacity-50 cursor-default" : "hover:bg-gray-200 "
        }`}
        disabled={pageNo === 1}
        onClick={handleBackPagination}
      >
        <PiCaretLeftThin className="h-5 w-5" />
      </button>

      <button
        className={`p-2 rounded-full ${
          totalPages === pageNo
            ? "opacity-50 cursor-default"
            : "hover:bg-gray-200 "
        }`}
        onClick={handleNextPagination}
        disabled={totalPages == pageNo}
      >
        <PiCaretRightThin className="h-5 w-5" />
      </button>

      <button
        className={`p-2 rounded-full ${
          totalPages === pageNo
            ? "opacity-50 cursor-default"
            : "hover:bg-gray-200 "
        }`}
        onClick={handleLastPagination}
        disabled={totalPages == pageNo}
      >
        <PiCaretLineRightThin className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Pagination;
