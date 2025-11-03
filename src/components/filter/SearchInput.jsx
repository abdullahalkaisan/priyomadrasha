
// import TextField from "@mui/material/TextField";
// import { useSearchStore } from "../../store/useSearchStore";

// const SearchInput = () => {
//   const { searchValue, setSearchValue } = useSearchStore();

//   return (
//     <TextField
//       size="small"
//       fullWidth
//       id="outlined-basic"
//       label="Search | অনুসন্ধান | নাম | ফোন | ইমেইল | ঠিকানা"
//       variant="outlined"
//       value={searchValue}
//       onChange={(e) => setSearchValue(e.target.value)}
//       sx={{
//         "& .MuiInputLabel-root": {
//           color: "#999",
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: "teal",
//         },
//         "& .MuiOutlinedInput-root": {
//           "&.Mui-focused fieldset": {
//             borderColor: "#66b2b2",
//           },
//         },
//         "& .MuiInputBase-input": {
//           color: "teal",
//         },
//       }}
//     />
//   );
// };

// export default SearchInput;



















import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchStore } from "../../store/useSearchStore";
import { useEffect } from "react";

const SearchInput = () => {
  const {
    searchValue,
    setSearchValue,
    searchResults,
    loading,
    error,
    setSearchForm,
  } = useSearchStore();


        useEffect(() => {
          searchValue && setSearchForm("searchValue", searchValue || "");
        }, [setSearchForm, searchValue]);
      


    console.log(searchResults);

  return (
    <div className="w-full">
      <TextField
        size="small"
        fullWidth
        label="Search | অনুসন্ধান | নাম | ফোন | ইমেইল | ঠিকানা"
        variant="outlined"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{
          "& .MuiInputLabel-root": { color: "#999" },
          "& .MuiInputLabel-root.Mui-focused": { color: "teal" },
          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "#66b2b2",
          },
          "& .MuiInputBase-input": { color: "teal" },
        }}
      />

      <div className="flex items-center gap-3">
        {error && <p className="text-rose-500 mt-2">{error}</p>}
        {searchResults.success &&
          searchValue && (
            <p className="text-gray-500 mt-2">
              {searchResults?.total === 0
                ? "No Organization found!"
                : `Organization found (${searchResults?.total})`}
            </p>
          )}

        {loading && (
          <div className="mt-2 text-gray-500">
            <CircularProgress size={18} color="inherit" />
          </div>
        )}
      </div>

      {/* {!loading && searchResults.length > 0 && (
        <ul>
          {searchResults.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> — {item.phone} — {item.email}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default SearchInput;






































//             // <TextField
//             //   size="small"
//             //   fullWidth
//             //   id="outlined-basic"
//             //   label="Search | অনুসন্ধান | নাম | ফোন | ইমেইল | ঠিকানা"
//             //   variant="outlined"
//             //   sx={{
//             //     // Label color
//             //     "& .MuiInputLabel-root": {
//             //       color: "#999",
//             //     },
//             //     // Label color when focused
//             //     "& .MuiInputLabel-root.Mui-focused": {
//             //       color: "teal",
//             //     },
//             //     // Border color
//             //     "& .MuiOutlinedInput-root": {
//             //       // "& fieldset": {
//             //       //   borderColor: "teal",
//             //       // },
//             //       // "&:hover fieldset": {
//             //       //   borderColor: "#66b2b2",
//             //       // },
//             //       "&.Mui-focused fieldset": {
//             //         borderColor: "#66b2b2",
//             //       },
//             //     },
//             //     // Text color (optional)
//             //     "& .MuiInputBase-input": {
//             //       color: "teal",
//             //     },
//             //   }}
//             // />;