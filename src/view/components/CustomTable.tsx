import { useMemo, useState } from "react";
import RemoveIcon from "../../assets/icons/remove.svg";
import SettingsIcon from "../../assets/icons/settings.png";
import ArrowIcon from "../../assets/icons/arrow.svg";
import UserIcon from "../../assets/icons/user.svg";
import ReactPaginate from "react-paginate";
import Search from "./inputs/Search";
import classNames from "classnames";
import { recordOptions } from "../../config/config";

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface Data {
  [key: string]: any;
}

interface CustomTableProps {
  data: Data[];
  columns: Column[];
  pageSize: number;
  isLoading?: boolean;
  onView?: (col: {[key: string]: any}) => void;
  onDelete?: (row: {[key: string]: any}) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data = [],
  columns,
  isLoading = false,
  onView,
  onDelete
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>({ key: "", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(4);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((row) => {
    return Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  function requestSort(key: string) {
    let direction = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  }

  const displayedData = filteredData.slice(startIndex, endIndex);

  const cols = useMemo(() => {
    return [...columns, { key: "actions", label: "Actions" }];
  }, [columns]);

  return (
    <>
      <div className="w-[1400px] relative">
        <div className="absolute top-[-150px] right-0">
          <Search
            placeholder="Search..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <table className="w-full text-[16px] text-left font-[400]">
          <thead className="text-xs text-gray-700 uppercas">
            <tr className="border-b-[2px] border-[#d8d8d87e]">
              {cols.map((column) => (
                <th
                  scope="col"
                  className={classNames("py-4 uppercase", {
                    "cursor-pointer":
                      column.key !== "actions" && column.key !== "status"
                  })}
                  style={{
                    width: column.label === "actions" ? "10px" : column.width
                  }}
                  key={column.key}
                  onClick={() => {
                    if (column.key !== "actions" && column.key !== "status") {
                      requestSort(column.key);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-4">{column.label}</div>
                    {column.key !== "actions" && column.key !== "status" && (
                      <img
                        src={ArrowIcon}
                        alt="Your SVG"
                        style={{
                          rotate:
                            sortConfig &&
                            sortConfig.key === column.key &&
                            sortConfig.direction === "descending"
                              ? "180deg"
                              : "0deg"
                        }}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? null
              : displayedData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b-[1px] border-[#d8d8d88f]"
                  >
                    {cols.map((column) => {
                      return (
                        <td
                          key={column.key}
                          className={classNames("py-4", {
                            "opacity-[0.4]":
                              !row.status.props.checked &&
                              column.key !== "status" &&
                              !row.status.props.checked &&
                              column.key !== "actions"
                          })}
                        >
                          <span className="flex">
                            {column.key !== "user" &&
                              column.key !== "role" &&
                              row[column.key]}
                            {column.key === "role" && row.roleDisplay}

                            {column.key === "user" && (
                              <div
                                className={
                                  "flex items-center py-4 text-gray-900 whitespace-nowrap"
                                }
                              >
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={UserIcon}
                                  alt="user"
                                />
                                <div className="pl-3">
                                  <div className="text-base font-semibold">
                                    {row.firstName} {row.lastName}
                                  </div>
                                  <div className="font-normal text-gray-500">
                                    {row.email}
                                  </div>
                                </div>
                              </div>
                            )}
                            {column.key === "actions" ? (
                              <div className="flex justify-center">
                                <button
                                  className="mr-4"
                                  onClick={() => {
                                    if (!onView) return;
                                    onView(row);
                                  }}
                                >
                                  <img src={SettingsIcon} alt="Your SVG" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (!onDelete) return;
                                    onDelete(row);
                                  }}
                                >
                                  <img src={RemoveIcon} alt="Your SVG" />
                                </button>
                              </div>
                            ) : null}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </table>
        <footer className="flex justify-between items-center mt-5">
          <div className="flex justify-center items-center gap-3">
            <span>Records on page</span>
            <select
              className="bg-transparent outline-none"
              onChange={(o) => {
                setPageSize(+o.target.value);
              }}
            >
              {recordOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={option.value === 4}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex justify-center mt-6"
              pageClassName="mx-1"
              pageLinkClassName="px-3 py-1 font-semibold "
              activeClassName="rounded-[20px]"
              previousClassName="rounded-lg"
              previousLinkClassName="px-3 py-1 text-gray-700 font-semibold"
              nextClassName="rounded-lg"
              nextLinkClassName="px-3 py-1 text-gray-700 font-semibold"
              activeLinkClassName="rounded-[10px] px-3 py-2 font-semibold bg-gray-400"
              breakClassName="mx-2"
              breakLinkClassName="px-3 py-1 font-semibold"
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default CustomTable;
