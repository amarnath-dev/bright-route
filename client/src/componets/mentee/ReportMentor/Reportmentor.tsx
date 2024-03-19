import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../app/useAxiosPrivate";
import { mentorProfileObj } from "../../../datatypes/Datatypes";

interface ReportmentorProps {
  setOpen: (open: boolean) => void;
  mentor: mentorProfileObj | undefined;
}

const Reportmentor: React.FC<ReportmentorProps> = ({ setOpen, mentor }) => {
  const [reportData, setReportData] = useState({
    issueFaced: "",
    issueDescription: "",
    date: "",
  });

  const axiosPrivate = useAxiosPrivate();
  const handleChage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setReportData({
      ...reportData,
      [e.target.name]: (e.target as HTMLInputElement).value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !reportData.issueFaced ||
      !reportData.issueDescription ||
      !reportData.date
    ) {
      toast.error("All fields are required");
      return;
    }
    const response = await axiosPrivate.post(
      `/report/mentor/${mentor?.mentor_id}`,
      reportData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast(response.data.message);
      setInterval(() => {
        setOpen(false);
      }, 1000);
    } else {
      setInterval(() => {
        toast.error("Report send Failed");
      }, 1000);
    }
  };

  return (
    <>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto md:fixed overflow-x-hidden flex z-50 justify-center items-center w-full h-full md:inset-0 max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full rounded-lg bg-gray-800">
          <div className="relative rounded-lg shadow bg-gray-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-400">
                Report Mentor
              </h3>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-900"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close Modal</span>
              </button>
            </div>

            <form
              className="p-4 md:p-5 bg-gray-800"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    What issue do you faced ?
                  </label>
                  <select
                    id="countries"
                    name="issueFaced"
                    value={reportData?.issueFaced}
                    onChange={handleChage}
                    className="bg-gray-50 border border-gray-300 text-md rounded-lg w-72 md:w-96 p-2.5 dark:placeholder-gray-400 text-gray-400"
                  >
                    <option>Choose the Type</option>
                    <option value="Harrasment">Harrasment</option>
                    <option value="Sexual Talks">Sexual Talks</option>
                    <option value="Rude Behaviour">Rude Behaviour</option>
                    <option value="Not Responding">Not Responding</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-400"
                  >
                    Describe the issue you Faced
                  </label>
                  <textarea
                    id="description"
                    name="issueDescription"
                    value={reportData?.issueDescription}
                    onChange={handleChage}
                    rows={4}
                    className="block p-2.5 w-full text-sm rounded-lg placeholder:text-gray-400"
                    placeholder="Write here..."
                  ></textarea>
                </div>
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  value={reportData?.date}
                  onChange={handleChage}
                  className="w-full rounded h-10 mb-6 indent-2"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white flex items-center justify-center w-full bg-color-five font-medium rounded-lg text-md px-5 py-2.5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reportmentor;
