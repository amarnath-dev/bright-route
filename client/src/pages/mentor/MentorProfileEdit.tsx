import React, { useEffect, useRef, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase";
import API from "../../api";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../../componets/ImageCrop/CanvasPreview";
import { useDebounceEffect } from "../../componets/ImageCrop/UseDebounceEffect";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MentorProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const [defaultSkills, setDefaultSkills] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const [imgSrc, setImgSrc] = useState("");
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef("");
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const [closeCrop, seCloseCrop] = useState(false);

  const [mentorData, setMentorData] = useState({
    first_name: "",
    last_name: "",
    mentorEmail: "",
    company: "",
    linkedIn: "",
    twitter: "",
    web_url: "",
    job_title: "",
    bio: "",
    category: "",
    state: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const handleAutoCompleteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value
  ) => {
    setDefaultSkills(value);
  };

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/profile", {
          withCredentials: true,
        });
        if (response.data) {
          const mentorDetails = response.data.mentorDetails;
          setMentor(mentorDetails);
          const skillValues = mentorDetails.skills;
          const topSkills = skillValues.map((skill: string) => ({
            title: skill,
          }));
          setDefaultSkills(topSkills);
          setMentorData(mentorDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
  }, [closeCrop]);

  useEffect(() => {
    const imageId = mentor?.profile_img;
    if (imageId) {
      const imageRef = ref(storage, imageId);
      getDownloadURL(imageRef)
        .then((url) => {
          const img = document.getElementById(
            "profile_img"
          ) as HTMLImageElement;
          img.src = url;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [mentor]);

  const handleSubmit = async () => {
    try {
      console.log("Button Clicked");
      const response = await axiosPrivate.post(
        "/mentor/profile/update",
        { mentorData, defaultSkills },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        toast(response.data.message);
        setTimeout(function () {
          navigate("/mentor/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //---------Image Crop and Upload -----------------//
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;

      //Now upload it to the firebase
      const imgId =
        Math.random().toString(16).slice(2) +
        (new Date().getTime() / 1000).toString();
      const reference = ref(storage, imgId);
      const snapshot = await uploadBytes(reference, blob);

      if (snapshot.metadata) {
        const img_firebase_id: string = snapshot.metadata.fullPath;
        const response = await API.post(
          "/mentor/profile/profileImg-update",
          { img_firebase_id },
          { withCredentials: true }
        );
        if (response?.data?.status === "success") {
          seCloseCrop(true);
          toast(response?.data?.message);
        } else {
          toast.error("Image Updation Failed");
        }
      }
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  return (
    <>
      <ToastContainer className="w-40 md:w-80" />
      <div className="w-full h-screen flex-row md:flex md:items-center md:flex-col">
        <div className="w-full ml-1 mr-1 md:ml-0 md:mr-0  md:w-2/3 md:h-40 mt-10 rounded-lg flex flex-row">
          <div className="w-40 h-full flex justify-center items-center flex-col px-2 py-2">
            <img
              alt="profile_img"
              className="mt-2 w-32 h-32 md:mt-0 rounded-full ml-2 border-2 object-cover"
              id="profile_img"
            />
            <div className="mt-3">
              <Button
                id="img_btn"
                onClick={() => seCloseCrop(false)}
                style={{
                  background: "white",
                  color: "black",
                  border: "1px solid black",
                  width: 180,
                  marginLeft: 30,
                }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Photo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  onClick={handleToggleAspectClick}
                />
              </Button>

              <div className={closeCrop === false ? "" : "hidden"}>
                {!!imgSrc && (
                  <div className="md:ml-0">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      minHeight={100}
                    >
                      <img
                        width={300}
                        ref={imgRef}
                        alt="Crop Me"
                        src={imgSrc}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  </div>
                )}
                {!!completedCrop && (
                  <>
                    <div className="hidden">
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          border: "1px solid black",
                          objectFit: "contain",
                          width: completedCrop.width,
                          height: completedCrop.height,
                        }}
                      />
                    </div>

                    <div className="ml-1 flex flex-col">
                      <button
                        onClick={onDownloadCropClick}
                        className="border-2 px-1 py-1 bg-color-one text-white rounded-md z-20"
                      >
                        Save Image
                      </button>

                      <button
                        className="border-2 py-1 px-1 rounded-md bg-color-five z-20"
                        onClick={() => seCloseCrop(true)}
                      >
                        Discard
                      </button>

                      <a
                        href="#hidden"
                        ref={hiddenAnchorRef}
                        download
                        style={{
                          position: "absolute",
                          top: "-200vh",
                          visibility: "hidden",
                        }}
                      >
                        Hidden download
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full md:w-2/3 mt-2 rounded-lg mb-72 md:mb-3">
          <div className="flex flex-col items-center md:flex-row md:justify-between px-2 py-2">
            <label>
              <h1>First Name</h1>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="md:mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5"
                value={mentorData?.first_name}
                onChange={handleInputChange}
              />
            </label>
            <label className="mt-2">
              <h1>Last Name</h1>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="md:mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5"
                value={mentorData?.last_name}
                onChange={handleInputChange}
              />
            </label>
            <label className="mt-2">
              <h1>Email</h1>
              <input
                type="text"
                id="email"
                name="mentorEmail"
                className="md:mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-2 w-80 md:w-64 p-2.5"
                value={mentorData?.mentorEmail}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row px-2 py-2 items-center md:justify-between">
            <label>
              <h1>Company </h1>
              <input
                type="text"
                id="company"
                name="company"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1 w-80 md:w-64 p-2.5"
                value={mentorData?.company}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1>LinkedIn</h1>
              <input
                type="text"
                id="linkedIn"
                name="linkedIn"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.linkedIn}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1>Twitter</h1>
              <input
                type="text"
                id="twitter"
                name="twitter"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.twitter}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:px-2 md:py-2 items-center">
            <label>
              <h1>Personal Website</h1>
              <input
                type="text"
                id="personal_web"
                name="web_url"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.web_url}
                onChange={handleInputChange}
              />
            </label>
            <label className="md:ml-8">
              <h1>Job Title</h1>
              <input
                type="text"
                id="job_title"
                name="job_title"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.job_title}
                onChange={handleInputChange}
              />
            </label>
            <label className="md:ml-8">
              <h1>State</h1>
              <input
                type="text"
                id="state"
                name="state"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.state}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:px-2 md:py-2 items-center">
            <label>
              <h1 className="font-bold">Select Category</h1>
              <select
                name="category"
                id="category"
                value={mentorData?.category}
                onChange={handleInputChange}
                className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md mt-1 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-80 md:w-96 sm:text-sm"
              >
                <option value="null">-------</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Engineering & Data">Engineering & Data</option>
                <option value="UI & UX Design">UI & UX Design</option>
                <option value="Bussiness & Managment">
                  Bussiness & Managment
                </option>
                <option value="Product & Marketing">Product & Marketing</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-46 md:w-2/3 h-screen md:mt-10 rounded-lg border-2 px-3 py-3">
          <div className="px-2 md:px-0">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              ABOUT ME
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={10}
              defaultValue={mentorData?.bio}
              onChange={handleInputChange}
              className="block p-2.5 w-full text-lg rounded-lg focus:border-gray text-black bg-white border-2"
            ></textarea>
          </div>
          <h1 className="mt-4 font-bold">Update your Skills</h1>
          <div className="px-1 py-1 mt-4">
            <Stack spacing={3} sx={{ width: 300 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={topSkills}
                getOptionLabel={(option) => option.title}
                value={defaultSkills}
                onChange={handleAutoCompleteChange}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option.title
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Skills"
                    placeholder="Add Skills..."
                  />
                )}
              />
            </Stack>
          </div>

          <div className="flex justify-end mt-5 md:mt-0">
            <button
              type="button"
              className="text-gray-90 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10 bg-color-one text-white"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfileEdit;
const topSkills = [
  { title: "Node js" },
  { title: "React" },
  { title: "HTML" },
  { title: "Typescript" },
  { title: "Mongodb" },
  { title: "Python" },
  { title: "Java" },
  {
    title: "Javascript",
  },
  {
    title: "Ruby",
  },
  {
    title: "Fortran",
  },
];
