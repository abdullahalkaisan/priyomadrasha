

// import PendingCard from "../components/cards/PendingCard";
// import PageHeader from "../components/PageHeader";

// const PendingPage = () => {
//   return (
//     <div className="pb-5">
//       {/* Header */}
//       <PageHeader title={"Pending Organizations"} subtitle={""} />
//       {/* Content */}
//       <div className="flex w-full flex-wrap justify-center py-5">
//         <PendingCard />

//       </div>
//     </div>
//   );
// };

// export default PendingPage;


















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Filter } from "lucide-react";
import { usePendingOrgStore } from "../store/usePendingStore";
import PageHeader from "../components/PageHeader";
import PendingOrgCard from "../components/cards/PendingOrgCard";
import { useAuthStore } from "../store/useAuthStore";
import Swal from "sweetalert2";


export default function PendingPage() {
  const navigate = useNavigate();
  const { organizations, loading, fetchUserOrganizations, deleteOrganization } =
    usePendingOrgStore();
   const {user} = useAuthStore()

  // Replace with actual user email from your auth system
  // const userEmail = "abdullahalkaisan@gmail.com"; // TODO: Get from auth context

  const [filter, setFilter] = useState("all"); // all, pending, active, rejected

  useEffect(() => {
    fetchUserOrganizations(user.email);
  }, [user.email, fetchUserOrganizations]);


  const handleEdit = (organization) => {
    // Navigate to edit page with organization data
    // navigate(`/${organization.urlID}`, {
    //   state: { organization },
    // });
  };




  // const handleDelete = async (id) => {
  //   try {
  //     await deleteOrganization(id);
  //     alert("Organization deleted successfully");
  //   } catch (error) {
  //     alert("Failed to delete organization: " + error.message);
  //   }
  // };



  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteOrganization(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your organization has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not delete the organization.",
      });
    }
  };



  // Filter organizations based on status
  const filteredOrganizations = organizations.filter((org) => {
    if (filter === "all") return true;
    if (filter === "pending") return org.isPending;
    if (filter === "active") return org.isActive;
    if (filter === "rejected") return org.isRejected;
    return true;
  });

  const stats = {
    total: organizations.length,
    pending: organizations.filter((o) => o.isPending).length,
    active: organizations.filter((o) => o.isActive).length,
    rejected: organizations.filter((o) => o.isRejected).length,
  };

  return (
    <div>
      <PageHeader
        title="My Organizations"
        subtitle="Manage your submitted organizations"
        backBtnPath={"/"}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">



        {/* Stats */}
        <div className="grid hidden grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <p className="text-sm text-yellow-800 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-900">
              {stats.pending}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <p className="text-sm text-green-800 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-900">{stats.active}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <p className="text-sm text-red-800 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
          </div>
        </div>

        {/* Filter and Add Button */}
        <div className="flex hidden flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex items-center gap-2 ">

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select cursor-pointer w-full max-w-xs"
            >
              <option disabled selected>
                Select filter
              </option>
              <option value="all">All Organizations</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* <button
            onClick={() => navigate("/create-organization")}
            className="flex items-center gap-2 cursor-pointer px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            <Plus size={20} />
            Add New Organization
          </button> */}
        </div>



        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No organizations found
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "all"
                ? "You haven't created any organizations yet"
                : `No ${filter} organizations found`}
            </p>
            <button
              onClick={() => navigate("/create-organization")}
              className="px-6 py-3 bg-teal-600 cursor-pointer text-white rounded-lg hover:bg-teal-700 transition font-semibold"
            >
              Create Your First Organization
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap w-full justify-center gap-6">
            {filteredOrganizations.map((org) => (
              <PendingOrgCard
                key={org._id}
                organization={org}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}