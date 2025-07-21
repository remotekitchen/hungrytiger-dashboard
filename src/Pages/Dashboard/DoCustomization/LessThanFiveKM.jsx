import React, { useState } from "react";

const LessThanFiveKM = () => {
  const [field, setNewField] = useState("");
  const [rows, setRows] = useState([
    { title: "Original Dish Price", count: 5 },
    { title: "Inflation", count: 5 },
    { title: "Delivery Fees", count: 5 },
    { title: "Service Fees", count: 5 },
  ]);

  const handleCreateRow = () => {
    if (field.trim() !== "") {
      setRows([...rows, { title: field, count: 5 }]);
      setNewField(""); // Clear the input field after creating the row
    }
  };

  const handleAddField = (index) => {
    const newRows = [...rows];
    newRows[index].count += 1;
    setRows(newRows);
  };

  const handleRemoveField = (index) => {
    const newRows = [...rows];
    if (newRows[index].count > 1) {
      newRows[index].count -= 1;
      setRows(newRows);
    }
  };

  const handleRemoveRow = (indexToRemove) => {
    setRows(rows.filter((_, index) => index !== indexToRemove));
  };

  // Get the count of the first row
  const firstRowCount = rows.length > 0 ? rows[0].count : 1;

  return (
    <div className="my-3">
      <h3 className="font-bold pb-3">In Less Than 5 Km</h3>
      <hr />
      {/* Default rows */}
      {rows.map((row, index) => (
        <div key={index} className="my-2 flex items-center justify-between ">
          <div>
            <h3 className="py-2 font-bold">{row.title}</h3>
            <div className="flex items-center flex-wrap gap-2 relative">
              {[...Array(row.count)].map((_, i) => (
                <input
                  key={i}
                  defaultValue="$10"
                  type="text"
                  className="w-32 h-10 rounded bg-[#d7d9e0a8] shadow-2xl text-center"
                />
              ))}
              <div>
                <button
                  onClick={() => handleAddField(index)}
                  className="w-8 h-10 bg-[#34C2FE] text-white"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveField(index)}
                  className={`w-8 h-10 bg-red-500 text-white `}
                >
                  -
                </button>
              </div>
              {index > 3 && (
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="rounded-full flex justify-center items-center bg-red-500 w-6 h-6 text-white absolute -top-3 -left-3"
                >
                  -
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Delivery fees Shows To The Customer  */}
      <div>
        <h3 className="py-2 font-bold">Delivery Fees Shows To The Customer</h3>
        <div className="flex items-center flex-wrap gap-2">
          {[...Array(firstRowCount)].map((_, i) => (
            <input
              key={i}
              disabled
              defaultValue="$0.99"
              type="text"
              className="w-32 h-10 rounded bg-[#d7d9e0a8] shadow-2xl text-center"
            />
          ))}
        </div>
      </div>
      {/* Modal for creating new row */}
      <button
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className="btn px-5 py-2 rounded-lg bg-[#43C2FE] text-white mt-5"
      >
        Add New Row
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Field Name</h3>
          <input
            type="text"
            value={field}
            onChange={(e) => setNewField(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full my-3"
          />
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                handleCreateRow();
                document.getElementById("my_modal_2").close();
              }}
              className="px-5 py-2 rounded-lg bg-[#43C2FE] my-3 text-white"
            >
              Create New Row
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => document.getElementById("my_modal_2").close()}>
            close
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default LessThanFiveKM;
