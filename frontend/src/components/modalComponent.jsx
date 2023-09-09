import { Modal, TextField, Button } from "@mui/material";

const ModalComponent = (props) => {
  return (
    <Modal
      open={props.modalState}
      onClose={() => props.setModalState(false)}
      className="m-auto flex h-1/3 w-full max-w-6xl justify-center rounded-lg shadow-xl"
    >
      <div className="flex h-full w-2/3 flex-col justify-between rounded-lg bg-white">
        <p className="mt-5 text-center text-3xl font-bold text-black">
          Search Weather & News
        </p>
        <p className="my-5 text-center text-2xl font-semibold text-black">
          Please enter the name of the city you want to search:
        </p>
        <form
          className="flex flex-col justify-center"
          onSubmit={props.handleSubmit}
        >
          <TextField
            id="cityName"
            label="City Name"
            variant="outlined"
            className="mx-auto mb-5 w-2/3"
            onChange={(e) => props.setCityName(e.target.value)}
            required
          />
          <Button
            variant="contained"
            className="mx-auto mb-5 w-2/3 bg-sky-500 text-base normal-case"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalComponent;
