export const dataGridSxStyles = (isDarkMode) => ({
  "& .MuiDataGrid-root": {
    backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
  },
  "& .MuiDataGrid-columnHeaders": {
    color: `${isDarkMode ? "#e5e7eb" : ""}`,
    '& [role="row"] > *': {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
      borderColor: `${isDarkMode ? "#2d3135" : ""}`,
    },
  },
  "& .MuiIconButton-root": {
    color: `${isDarkMode ? "#a3a3a3" : ""}`,
  },
  "& .MuiTablePagination-root": {
    backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    color: `${isDarkMode ? "#a3a3a3" : ""}`,
  },
  "& .MuiTablePagination-selectIcon": {
    color: `${isDarkMode ? "#a3a3a3" : ""}`,
  },
  "& .MuiDataGrid-cell": {
    border: "none",
    "&:focus": {
      outline: "none",
    },
  },
  "& .MuiDataGrid-row": {
    color: `${isDarkMode ? "#e5e7eb" : ""}`,
    backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
    "&:hover": {
      backgroundColor: `${isDarkMode ? "#6b728066" : "#e5e7eb66"}`, // Set row hover color to gray-600
    },
    "&.Mui-selected": {
      backgroundColor: `${isDarkMode ? "#4b5563" : "#d1d5db"}`, // Set selected row color
      "&:hover": {
        backgroundColor: `${isDarkMode ? "#4b5563" : "#d1d5db"}`, // Ensure hover doesn't override selected color
      },
    },
  },
  "& .MuiDataGrid-withBorderColor": {
    borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowX: "hidden !important",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    display: "none",
  },
  "& .MuiDataGrid-virtualScroller": {
    msOverflowStyle: "none", // Hide scrollbar for IE and Edge
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  },
  "& .MuiTablePagination-actions .MuiIconButton-root": {
    color: `${isDarkMode ? "#ffffff" : ""}`, // Change pagination icon color to white in dark mode
    cursor: "pointer", // Set cursor to pointer
  },
  "& .MuiDataGrid-checkboxInput.Mui-checked": {
    backgroundColor: `${isDarkMode ? "#4b5563" : "#d1d5db"}`, // Change selected row label background color
  },
});
