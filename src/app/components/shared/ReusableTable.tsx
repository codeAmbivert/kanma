"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  ReactElement,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Filter from "./Filter";
import { useHydrateUser } from "@/helper/user";
import { EmptyTableIcon } from "../../../../public/icons/iconsExport";
import CustomTableOptions from "./CustomTableOptions";
// import { API_TOKEN } from "@/utils/constants";

interface UserData {
  // user: {
  // _id: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // status: string,
  // role: string,
  // };
  token: string;
}

interface TableHeaders {
  headers?: { id: string; label: string }[];
  apiEndpoint: string;
  onRowClick?: string | (() => void);
  pagination?: boolean;
  filter?: boolean;
  tableName?: string;
  sideButton?: ReactElement<any>;
  dataTransformer?: (apiData: any) => any;
  initialData?: any[];
  showSearch?: boolean;
  showViewAll?: boolean;
  refresh?: boolean;
  setRefresh?: (val: boolean) => void;
}

const ReusableTable = ({
  headers,
  apiEndpoint,
  dataTransformer,
  onRowClick,
  filter,
  tableName,
  sideButton,
  pagination,
  initialData,
  showSearch = true,
  showViewAll = true,
  refresh,
  setRefresh,
}: TableHeaders) => {
  const router = useRouter();
  const { userData } = useHydrateUser() as {
    userData: UserData;
    isHydrated: boolean;
  };
  const [data, setData] = useState<any[]>(initialData || []);
  const [sortField, setSortField] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [paginationLinks, setPaginationLinks] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>("10");

  const perPageOptions = ["5", "10", "20", "50", "100"];

  // State to track selected rows
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const fetchData = useCallback(
    async (
      page: number,
      perPage: string,
      sortField: string,
      sortDirection: string,
      filterValue: string,
      searchTerm?: string
    ) => {
      setLoading(true);

      try {
        const params = {
          page,
          limit: perPage,
          search: searchTerm,
          status: filterValue,
        };
        const response = await axios.get(apiEndpoint, {
          params,
          headers: {
            authorization: `Bearer ${userData?.token}`,
          },
        });
        console.log({ response });
        const transformedData = dataTransformer
          ? dataTransformer(
              response?.data?.data || response?.data?.results || response?.data
            )
          : response.data;
        setData(transformedData);
        setPaginationLinks(
          response?.data?.pagination?.paginationLinks ||
            response?.data?.data?.pagination?.paginationLinks
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        if (setRefresh) setRefresh(false);
      }
    },
    [apiEndpoint, dataTransformer, setRefresh]
  );

  console.log({ data });

  const debouncedSearch = useMemo(() => {
    return searchTerm.trim();
  }, [searchTerm]);

  useEffect(() => {
    fetchData(
      currentPage,
      perPage,
      sortField,
      sortDirection,
      filterValue,
      debouncedSearch
    );
  }, [
    currentPage,
    perPage,
    sortField,
    apiEndpoint,
    sortDirection,
    filterValue,
    debouncedSearch,
    fetchData,
  ]);

  useEffect(() => {
    if (refresh) {
      setTimeout(
        () =>
          fetchData(
            currentPage,
            perPage,
            sortField,
            sortDirection,
            filterValue,
            debouncedSearch
          ),
        1000
      );
    }
  }, [refresh, fetchData]);

  useEffect(() => {
    if (data?.length > 0) {
      setFilteredData(data.map((item) => ({ ...item })));
    }
  }, [data]);

  const generatePageNumbers = useMemo(() => {
    if (!paginationLinks) return [];
    const totalPages = Math.ceil(
      paginationLinks.totalDocuments / parseInt(perPage, 10)
    );
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    return pageNumbers;
  }, [paginationLinks, currentPage, perPage]);

  const handleRowClick = useCallback(
    (itemId: string) => {
      if (onRowClick) {
        router.push(`${onRowClick}/${itemId}`);
      }
    },
    [onRowClick, router]
  );

  // Handle checkbox selection
  const handleCheckboxChange = (id: string) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
      return newSelectedRows;
    });
  };

  // Handle select all checkbox
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = new Set(
        filteredData.map((item) => item.id || item._id)
      );
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  return (
    <div className="bg-white md:p-4 rounded-md">
      <div className="flex justify-between items-center p-4 pr-3 md:p-0 md:mb-5">
        <div>{tableName && <p>{tableName}</p>}</div>
        <div className="flex gap-2 md:gap-4">
          {filter && <Filter setValue={setFilterValue} />}
          {sideButton && sideButton}
        </div>
      </div>

      <div className="overflow-x-scroll hide-scrollbar relative w-full">
        {/* Medium to large screens */}
        <table className="max-md:hidden w-full rounded">
          <thead className="bg-[#F7F7F7] border border-cwLightGrayBg9 rounded-t-md w-full">
            <tr>
              {headers?.map((header) => (
                <th
                  key={header.id}
                  className="text-start p-4 text-sm text-cwTextGray whitespace-nowrap font-medium"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border w-full">
            {filteredData?.length > 0 ? (
              filteredData?.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => {
                    typeof onRowClick === "string"
                      ? handleRowClick(item.id || item._id)
                      : onRowClick && onRowClick();
                  }}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {headers?.map((header) => (
                    <td
                      key={header.id}
                      className="p-5 font-normal text-sm text-cwTextGray border-none"
                    >
                      {item[header.id]} 
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">
                  <div className="flex justify-center items-center h-full py-16 ">
                    <BiSearch className="text-9xl mb-4" />
                    <p className="text-xl">No Entry Yet</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Small screens */}
        <div className="md:hidden w-full">
          {filteredData?.length > 0 ? (
            filteredData?.map((item, index) => (
              <div
                key={item._id}
                onClick={() => handleRowClick(item.id || item._id)}
                className={`flex flex-col gap-4 border-y px-2 pb-3 mb-3 ${
                  index % 2 === 0 ? "bg-white" : "bg-white"
                }`}
                style={{ cursor: "pointer" }}
              >
                {headers?.map((header) => (
                  <div
                    key={header.id}
                    className="flex justify-between items-center text-sm mt-3 text-cwTextGray"
                  >
                    <div className="font-medium">{header.label}</div>
                    <div className="flex items-center">{item[header.id]}</div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-[350px]">
              <BiSearch className="text-9xl mb-4" />
              <p className="text-xl">No Entry Yet</p>
            </div>
          )}
        </div>

        {filteredData?.length <= 0 && (
          <div className="absolute h-[350px] w-full top-0 left-0 flex justify-center items-center bg-white">
            <div className="flex flex-col justify-center items-center h-full py-16 text-center">
              <EmptyTableIcon className="text-9xl   " />
              <p className="text-xl">No Entry Yet</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute h-full w-full top-0 left-0 flex justify-center items-center bg-white">
            <Image
              src="/images/loading.gif"
              alt="loader"
              width={100}
              height={100}
            />
          </div>
        )}
      </div>

      {pagination && filteredData.length > 0 && (
        <div className="mt-3 text-sm flex items-center justify-between p-3 md:p-0">
          <div className="flex items-center gap-5">
            <p>
              Showing {(currentPage - 1) * parseInt(perPage, 10) + 1} -{" "}
              {Math.min(
                currentPage * parseInt(perPage, 10),
                paginationLinks?.totalDocuments
              )}
            </p>

            <div>
              <button
                className={`pr-3 ${
                  paginationLinks?.prev === null
                    ? "text-armtInputBorderBrown"
                    : "text-armtNavBlack"
                }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                Previous
              </button>

              {generatePageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 ${
                    page === currentPage &&
                    "bg-swPrimaryNewText text-white rounded"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === generatePageNumbers.length}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <p
                  className={`pl-4 ${
                    paginationLinks?.next === null
                      ? "text-armtInputBorderBrown"
                      : "text-armtNavBlack"
                  }`}
                >
                  Next
                </p>
              </button>
            </div>
          </div>

          {showViewAll && (
            <div>
              <CustomTableOptions
                options={perPageOptions}
                value={perPage}
                onChange={setPerPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
