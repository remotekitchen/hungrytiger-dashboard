import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import { createArray } from "../../../core/utils";
import { useDeleteFissionCampaignMutation } from "../../../redux/features/fissionCampaign/fissionCampaignApi";

const RewardTable = ({ allFissionCampaigns, isgetCampaignLoading }) => {
  // // console.log("🚀 ~ RewardTable ~ allFissionCampaigns:", allFissionCampaigns);
  const [deleteFissionCampaignMutation] = useDeleteFissionCampaignMutation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  if (isgetCampaignLoading) return <Loading />;

  const pageArr = createArray(allFissionCampaigns);
  // Mutation hook for deleting fission campaign

  // update fission campaign update functionality

  // Function to handle delete action
  const handleDelete = async (campaignId) => {
    // Display SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this campaign!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    // If user confirms deletion, proceed with the delete operation
    if (result.isConfirmed) {
      try {
        await deleteFissionCampaignMutation({ campaignId });
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  const handleEdit = (rewardId) => {
    navigate("/dashboard/update-fission-campaigns");
  };

  // console.log("allFissionCampaigns", allFissionCampaigns);

  return (
    <div className="mt-5">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-sm text-black">
              {/* <th>Lucky Flip Name</th> */}
              <th>Condition</th>
              <th>Restaurant</th>
              <th>Maximum Flip</th>
              <th>Type Of Validity</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {allFissionCampaigns?.results?.filter((d) => d?.restaurant)
              .length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-2xl font-bold">
                  No data found
                </td>
              </tr>
            ) : (
              allFissionCampaigns?.results
                ?.filter((d) => d?.restaurant)
                .map((reward) => (
                  <tr key={reward?.id}>
                    {/* <td>{reward?.name}</td> */}
                    <td>{reward?.availability}</td>
                    <td>
                      {reward?.restaurant ? reward?.restaurant_name : "Unknown"}
                    </td>
                    <td>{reward?.max_flip_period}</td>
                    <td>{reward?.validity_type}</td>
                    <td>{reward?.created_date?.slice(0, 10)}</td>
                    <td>
                      <span className="mb-2 flex items-center ">
                        <BiEdit
                          onClick={() => handleEdit(reward?.id)}
                          className="text-xl text-[#697077] cursor-pointer"
                        />
                        <MdDeleteOutline
                          className="text-xl text-[#697077] ml-3 cursor-pointer"
                          onClick={() => handleDelete(reward?.id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      {/* pagination  */}
      <div className="w-10/12 mt-10">
        {pageArr && (
          <div className="join flex-wrap">
            {pageArr.map((getPage) => (
              <button
                onClick={() => {
                  setPage(getPage);
                }}
                key={getPage}
                className={`join-item my-1 btn btn-sm ${
                  page === getPage && "btn-active"
                }`}
              >
                {getPage}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardTable;
