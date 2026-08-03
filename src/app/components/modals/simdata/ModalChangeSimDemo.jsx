import { useState } from 'react';
import ModalChangeSim from './modalChangeSim';

const ModalChangeSimDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSim, setSelectedSim] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectSim = (sim) => {
    setSelectedSim(sim);
    console.log('Selected SIM:', sim);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modal Change SIM Demo</h1>

      <button
        onClick={handleOpenModal}
        className="bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-[#E69818] transition-colors"
      >
        Open Change SIM Modal
      </button>

      {selectedSim && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Selected SIM:</h2>
          <p><strong>Number:</strong> {selectedSim.number}</p>
          <p><strong>Price:</strong> {selectedSim.price || selectedSim.discountedPrice} VND</p>
        </div>
      )}

      {isModalOpen && (
        <ModalChangeSim
          onClose={handleCloseModal}
          onSelect={handleSelectSim}
        />
      )}
    </div>
  );
};

export default ModalChangeSimDemo;
