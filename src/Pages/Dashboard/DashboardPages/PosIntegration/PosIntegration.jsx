import React, { useState } from 'react';

const PosIntegration = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPOS, setSelectedPOS] = useState('Otter');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleRadioChange = (event) => {
    setSelectedPOS(event.target.value);
  };

  const togglePOS = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">POS Integration</h1>
      <h2 className="text-2xl font-bold">Using a POS for Delivery Orders</h2>
      <p>If you use a POS, we’ll let you track whether orders have been entered or still need to be input</p>
      <div className="flex items-center my-3 gap-3">
        <input
          type="checkbox"
          className={`toggle ${isOpen ? 'bg-[#42C2FF] border border-[#42C2FF]' : 'bg-black border border-black'}`}
          defaultChecked
          onClick={togglePOS}
        />
        You are using a POS
      </div>
      {isOpen && (
        <div className="space-y-4">
          <div className="font-bold">
            Your POS: {selectedPOS}
          </div>

          {!isEditing ? (
            <button
              className="bg-[#42C2FF] text-white font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
            >
              Edit POS
            </button>
          ) : (
            <button
              className="bg-[#42C2FF] text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
          )}

          {isEditing && (
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="posOption"
                  className="h-4 w-4"
                  value="Otter"
                  checked={selectedPOS === 'Otter'}
                  onChange={handleRadioChange}
                />
                <span className="mr-2">Otter</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="posOption"
                  className="h-4 w-4"
                  value="Cuboh"
                  checked={selectedPOS === 'Cuboh'}
                  onChange={handleRadioChange}
                />
                <span className="mr-2">Cuboh</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="posOption"
                  className="h-4 w-4"
                  value="P-Link"
                  checked={selectedPOS === 'P-Link'}
                  onChange={handleRadioChange}
                />
                <span className="mr-2">P-Link</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="posOption"
                  className="h-4 w-4"
                  value="Square"
                  checked={selectedPOS === 'Square'}
                  onChange={handleRadioChange}
                />
                <span className="mr-2">Square</span>
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PosIntegration;
