import { useEffect } from "react";
import Header from "../components/Header";
import { useOrganizationStore } from "../store/useOrganizationStore";
import OrgCard from "../components/cards/OrgCard";
import DistrictSelector from "../components/filter/DistrictFilterSelector";
import DivisionSelector from "../components/selects/DivisionSelector";
import UpozilaSelector from "../components/selects/UpozilaSelector";
import SearchInput from "../components/filter/SearchInput";
import { useSearchStore } from "../store/useSearchStore";
import CheckFilter from "../components/filter/CheckFilter";
import ResidencyTypeSelector from "../components/filter/ResidencyTypeFilterSelector";
import DivisionFilterSelector from "../components/filter/DivisionFilterSelector";
import DistrictFilterSelector from "../components/filter/DistrictFilterSelector";
import UpozilaFilterSelector from "../components/filter/UpozilaFilterSelector";

const MadrashaPage = () => {

  const { getAllActiveOrganizations, organizations, loading, } = useOrganizationStore();


  const { searchResults, searchValue, SearchFormData, fetchAllFilter} =
    useSearchStore();

  useEffect(() => {
    getAllActiveOrganizations();
  }, [getAllActiveOrganizations]);

  useEffect(() => {
    fetchAllFilter(SearchFormData);
  }, [SearchFormData, fetchAllFilter]);


console.log(SearchFormData);


  return (
    <div className=" h-screen overflow-hidden bg-gradient-to-b from-white to-teal-50 ">
      <Header />
      <div className=" h-[calc(100vh-56px)] overflow-hidden flex">
        <div className="bg-white w-[400px] h-[calc(100vh-57px)] overflow-y-auto p-3">
          <div className="flex flex-col gap-6  px-6">
            <ResidencyTypeSelector />
            <CheckFilter />
          </div>
        </div>
        <div className=" w-full h-[calc(100vh-57px)] overflow-hidden ">
          <div className="w-full flex p-3 gap-3 bg-white">
            <SearchInput />
            <div className="flex w-[100%] gap-3">
              <DivisionFilterSelector />
              <DistrictFilterSelector />
              <UpozilaFilterSelector />
            </div>
          </div>
          <div className="w-full h-[calc(100vh-123px)] pb-16 overflow-y-auto flex flex-wrap justify-center py-6 gap-6 ">
            {searchResults.data && searchValue
              ? searchResults.data.map((item) => {
                  return <OrgCard key={item._id} organization={item} />;
                })
              : loading
              ? "loading"
              : organizations.map((item) => {
                  return <OrgCard key={item._id} organization={item} />;
                })}

            {/* {loading
              ? "loading"
              : organizations.map((item) => {
                  return <OrgCard key={item._id} organization={item} />;
                })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MadrashaPage;