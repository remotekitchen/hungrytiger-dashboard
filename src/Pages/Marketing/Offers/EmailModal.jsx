import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useDeleteEmailMutation,
  useGetEmailQuery,
  useSaveEmailMutation,
  useUpdateEmailMutation,
} from "../../../redux/features/email/emailApi";

const EmailModal = ({ setModalOpen, modalOpen, restaurantList }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [saveEmail] = useSaveEmailMutation();
  const [editEmail] = useUpdateEmailMutation();
  const [deleteEmail] = useDeleteEmailMutation();
  const { data: getEmail, isError: isEmailConfigError } =
    useGetEmailQuery(selectedRestaurant);
  // // console.log(getEmail);

  const onSubmit = async (data) => {
    try {
      if (getEmail && getEmail.length > 0) {
        const result = await editEmail({
          id: getEmail[0].restaurant,
          data,
        });

        toast.success("Email Configuration Updated Successfully!");
      } else {
        // If getEmail is empty, it's a new email
        const result = await saveEmail(data);
        toast.success("Email Configuration Saved Successfully!");
      }
      // // console.log("Email saved!", result);
      setModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("error");
    }
  };

  // Delete email configuration
  const onDelete = async () => {
    try {
      if (getEmail && getEmail.length > 0) {
        const result = await deleteEmail({
          id: getEmail[0].id,
        });

        toast.success("Email Deleted Successfully!");
        setModalOpen(false);
        reset();
      } else {
        // If getEmail is empty, there's nothing to delete
        console.warn("No email to delete");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Error deleting email");
    }
  };

  // Set default values from getEmail data
  useEffect(() => {
    // console.log("calling query",getEmail)

    if (isEmailConfigError) {
      // console.log(isEmailConfigError)
      setValue("email_host", "");
      setValue("email_port", "");
      setValue("email_use_tls", "");
      setValue("email_host_user", "");
      setValue("email_host_password", "");
    } else if (getEmail) {
      const defaultEmail = getEmail;
      setValue("email_host", defaultEmail.email_host);
      setValue("email_port", defaultEmail.email_port);
      setValue("email_use_tls", defaultEmail.email_use_tls);
      setValue("email_host_user", defaultEmail.email_host_user);
      setValue("email_host_password", defaultEmail.email_host_password);
    }
  }, [getEmail, isEmailConfigError, setValue, setSelectedRestaurant]);

  return (
    <div className="w-full fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-20 relative max-w-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            onClick={() => setModalOpen(!modalOpen)}
            className="absolute top-2 right-3 px-1 bg-red-300 rounded text-black font-bold hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-4">Email Configuration</h2>
          <div className="mb-4">
            <h1 className="font-bold mb-2">Restaurant</h1>
            <select
              {...register("restaurant")}
              // onChange={(event) => setSelectedRestaurant(event.target.value)}
              onChange={(event) => {
                const selectedRestaurantId = event.target.value;
                setSelectedRestaurant(selectedRestaurantId);
                // Call the refetch function to trigger the query for the newly selected restaurant
                // refetch();
              }}
              className="border border-[#DDE1E6] rounded-lg w-full p-2"
            >
              <option defaultValue="Select Restaurant">
                Select Restaurant
              </option>
              {restaurantList?.results?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h1 className="font-bold mb-2">Email Server</h1>
            <input
              {...register("email_host")}
              className="border border-[#DDE1E6] rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <h1 className="font-bold mb-2">Email Port</h1>
            <input
              type="number"
              {...register("email_port")}
              className="border border-[#DDE1E6] rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <h1 className="font-bold mb-2">Use TLS</h1>
            <select
              {...register("email_use_tls")}
              className="border border-[#DDE1E6] rounded-lg w-full p-2"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="mb-4">
            <h1 className="font-bold mb-2">Host User Email</h1>
            <input
              type="email"
              {...register("email_host_user")}
              className="border border-[#DDE1E6] rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <h1 className="font-bold mb-2">Host Password</h1>
            <input
              type="password"
              {...register("email_host_password")}
              className="border border-[#DDE1E6] rounded-lg w-full p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {getEmail && !isEmailConfigError ? "Edit" : "Save"}
          </button>
          {getEmail && !isEmailConfigError && (
            <button
              type="button"
              onClick={onDelete}
              className="bg-red-500 ml-3 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
