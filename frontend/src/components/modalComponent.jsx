import { Modal } from "@mui/material";

const ModalComponent = (props) => {
  return (
    <Modal
      open={props.modalState}
      onClose={() => props.setModalState(false)}
      className="m-auto flex h-2/5 max-h-60 w-full max-w-6xl justify-center rounded-lg"
    >
      <div className="flex h-auto w-2/3 flex-col justify-between rounded-lg bg-white">
        <p className="mt-5 text-center text-3xl font-bold text-black">
          Search Weather & News
        </p>
        <p className="px-10 text-center text-2xl font-semibold text-black">
          Please enter the name of the city you want to search.
        </p>
        <form
          className="mx-auto mb-5 flex w-full flex-col justify-center px-10"
          onSubmit={props.handleSubmit}
        >
          <label className="text-2xl font-semibold">City Name:</label>
          <input
            type="text"
            name="cityName"
            placeholder="Enter the name of the city."
            className="mx-auto mb-5 w-full rounded-md border-2 border-black text-xl"
            onChange={(e) => props.setCityName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-md bg-blue-700 text-xl font-semibold text-white hover:bg-blue-900"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalComponent;
