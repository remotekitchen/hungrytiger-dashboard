import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetEarningsQuery,
  useUpdateEarningsMutation,
} from "../../redux/features/earnings/earningsApi";
import { useGetAllRestaurantQuery } from "../../redux/features/restaurentCreation/restaurentCreationApi";

const MakeAdjustment = ({ statementId }) => {
  const [password, setPassword] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentNote, setAdjustmentNote] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(85);
  const [showStatement, setShowStatement] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const { data, error, isLoading } = useGetEarningsQuery(selectedRestaurant);

  const { data: allRestaurant } = useGetAllRestaurantQuery();

  useEffect(() => {
    setSelectedRestaurant(allRestaurant?.results[0]?.id);
  }, [allRestaurant]);

  console.log(data, "dataaa");

  const [updateEarnings] = useUpdateEarningsMutation();

  const secretCode = "adjust5x";

  useEffect(() => {
    if (data?.results) {
      const matchedStatement = data.results.find(
        (statement) => statement.id === statementId
      );

      if (matchedStatement) {
        setShowStatement(matchedStatement);
      }
    }
  }, [data, statementId]);

  console.log(showStatement, "Statement-Data");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === secretCode) {
      document.getElementById("my_modal_203").close();
      document.getElementById("my_modal_204").showModal();
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleAdjustmentSubmit = async (e) => {
    e.preventDefault();

    // Call the updateEarnings mutation to update the statement
    try {
      const result = await updateEarnings({
        id: statementId,
        InvoiceData: {
          adjustments: parseFloat(adjustmentAmount),
          adjustments_note: adjustmentNote,
        },
      }).unwrap();

      // console.log("Earnings updated successfully:", result);
      toast.success("success");
    } catch (error) {
      // console.error("Error updating earnings:", error);
    }

    // Close the modal after the update
    document.getElementById("my_modal_204").close();
  };

  return (
    <div className="p-4 shadow rounded-lg mt-4 bg-white space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold">Adjustments</h3>
          <button
            className="px-5 py-2 rounded-lg border bg-primary"
            onClick={() => document.getElementById("my_modal_203").showModal()}
          >
            Make Adjustment
          </button>
        </div>
      </div>
      <div className="border border-gray-200">
        <div className="hover:bg-gray-300 p-3 flex items-center justify-between">
          <div>
            <p className="">Adjustment Amount</p>
          </div>
          <span className="font-bold">
            ${showStatement?.adjustments ? showStatement?.adjustments : 0}
          </span>
        </div>
        <hr />
        {showStatement?.adjustments_note && (
          <div className="p-3">
            <div>
              <span className="font-medium pb-1 border-b-2 inline-block">
                Adjustment Note
              </span>
              <p className="pt-2">{showStatement?.adjustments_note}</p>
            </div>
          </div>
        )}
      </div>

      {/* First Modal for Password */}
      <dialog id="my_modal_203" className="modal">
        <div className="modal-box">
          <div className="w-full flex justify-between items-center">
            <h3 className="font-bold text-lg">Enter Your Password</h3>
            <span
              onClick={() => document.getElementById("my_modal_203").close()}
              className="cursor-pointer px-2 bg-red-300 rounded-lg"
            >
              X
            </span>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mt-3"
                placeholder="Enter Your Password"
                required
              />
              <span className="text-red-400 text-sm italic">
                {passwordError && passwordError}
              </span>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Second Modal for Adjustment */}
      <dialog id="my_modal_204" className="modal">
        <div className="modal-box">
          <div className="w-full flex justify-between items-center">
            <h3 className="font-bold text-lg">Enter Adjustment Details</h3>
            <span
              onClick={() => document.getElementById("my_modal_204").close()}
              className="cursor-pointer px-2 bg-red-300 rounded-lg"
            >
              X
            </span>
          </div>
          <form onSubmit={handleAdjustmentSubmit} className="space-y-4">
            <div>
              <input
                type="number"
                id="adjustmentAmount"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
                className="input input-bordered w-full mt-3"
                placeholder="Enter Adjustment Amount"
                required
              />
            </div>
            <div>
              <textarea
                id="adjustmentNote"
                value={adjustmentNote}
                onChange={(e) => setAdjustmentNote(e.target.value)}
                className="input input-bordered w-full mt-3"
                placeholder="Enter Adjustment Note"
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MakeAdjustment;
