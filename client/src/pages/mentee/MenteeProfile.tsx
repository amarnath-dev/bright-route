import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MenteeProfileCard } from "../../componets/mentee/MenteeProfileCard";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import API from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase";

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

export const MenteeProfile = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const [stateChange, setStateChange] = useState(false);

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [goal, setGoal] = useState("");
  const [radioDefault, setRadioDefault] = useState("");
  const [defaultCountry, setDefaultCountry] = useState("");
  const [defaultRegion, setdefaultRegion] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [imgSrc, setImgSrc] = useState("");
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef("");
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);

  const [formData, setFormdata] = useState({
    profile_img: "",
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    job_title: "",
    linkedIn: "",
    twitter: "",
    goal: "",
    available_time: "",
    region: "",
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const changeState = () => {
    setStateChange(true);
    document.getElementById("first_name")?.removeAttribute("disabled");
    document.getElementById("last_name")?.removeAttribute("disabled");
    document.getElementById("email")?.removeAttribute("disabled");
    document.getElementById("location")?.removeAttribute("disabled");
    document.getElementById("job_title")?.removeAttribute("disabled");
    document.getElementById("linkedIn")?.removeAttribute("disabled");
    document.getElementById("twitter")?.removeAttribute("disabled");
    document.getElementById("goal")?.removeAttribute("disabled");
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await API.get(`/managment/${user?._id}`, {
          withCredentials: true,
        });
        const details = response.data;
        console.log("details", details);
        setRadioDefault(details.menteeDetails.available_time);
        console.log("---------->", details.menteeDetails.goal);
        setGoal(details.menteeDetails.goal);
        console.log("---------->", details.menteeDetails.region);
        setDefaultCountry(details.menteeDetails.country);
        setdefaultRegion(details.menteeDetails.region);
        setProfileImg(details.menteeDetails.profile_img);
        setFormdata(details.menteeDetails);
      } catch (error) {
        // toast.error("Something went wrong");
        console.log("this is the error", error);
      }
    };
    fetchDetails();
  }, []);

  if (formData.profile_img) {
    const fetchImg = async () => {
      const imageId = formData.profile_img;
      //if check for avoiding root error
      if (imageId) {
        const imageRef = ref(storage, imageId);
        getDownloadURL(imageRef)
          .then((url) => {
            const img = document.getElementById(
              "profile-image"
            ) as HTMLImageElement;
            img.src = url;
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image fetch failed");
          });
      }
    };
    fetchImg();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.country = country;
    formData.region = region;
    formData.goal = goal;

    try {
      const response = await API.post("/managment/profie-update", formData, {
        withCredentials: true,
      });
      if (response) {
        const reqRes = response.data;
        if (reqRes.status == "success") {
          console.log("updated success");
          setStateChange(false);
          toast(reqRes.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  //------------------> Image Crop ------------------------------>//

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
      setAspect(15 / 8);

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
      // hiddenAnchorRef.current.click(); //this one downloads the image

      //Now upload it to the firebase
      const imgId =
        Math.random().toString(16).slice(2) +
        (new Date().getTime() / 1000).toString();
      const reference = ref(storage, imgId);
      const snapshot = await uploadBytes(reference, blob);

      if (snapshot.metadata) {
        const img_firebase_id: string = snapshot.metadata.fullPath;
        const response = await API.post(
          "/managment/profieImage-update",
          { img_firebase_id },
          { withCredentials: true }
        );
        if (response?.data?.status === "success") {
          toast(response?.data?.message);
          setStateChange(false);
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
      <div className="w-full h-full flex justify-center mb-28">
        <div className="w-full md:w-2/3 h-full border-2 mt-10 rounded-md">
          <div className="w-full h-full flex justify-center flex-col">
            <h1 className="text-center mt-4 text-md md:text-lg font-bold">
              Personal Information
            </h1>
            <MenteeProfileCard />
          </div>

          <div className="flex justify-between px-2">
            <div className="flex justify-center px-4 items-center">
              <Link
                to={"/managment/password"}
                className="text-blue-500 underline"
              >
                Change Password
              </Link>
            </div>
            <div className="px-1">
              <div
                className="rounded-full px-2 py-2 flex justify-center items-center"
                onClick={changeState}
              >
                <Button
                  variant="outlined"
                  style={{ border: "1px black solid" }}
                >
                  <h1 className="text-black">Edit</h1>
                  <EditIcon className="px-1 text-black" />
                </Button>
              </div>
            </div>
          </div>

          {formData?.profile_img ? (
            ""
          ) : (
            <div className="flex flex-col ml-6">
              <h1 className="font-bold">Add a profile Image</h1>
            </div>
          )}
          <div className="px-2 md:px-5 md:py-2 flex items-center">
            <div className="flex w-full flex-row items-center">
              <span className="flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4">
                <img
                  src={
                    formData?.profile_img
                      ? ""
                      : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                  }
                  alt="profile_img"
                  className="md:h-28 md:w-28 rounded-full"
                  id="profile-image"
                />
              </span>

              <div className="px-6 md:px-0 w-full">
                {stateChange === true ? (
                  <>
                    <Button
                      id="img_btn"
                      style={{
                        background: "white",
                        color: "black",
                        border: "1px solid black",
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
                    {!!imgSrc && (
                      <div className="w-full">
                        <ReactCrop
                          crop={crop}
                          onChange={(_, percentCrop) => setCrop(percentCrop)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={aspect}
                          minWidth={100}
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
                        <div>
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
                        <div>
                          <button
                            onClick={onDownloadCropClick}
                            className="border-2 px-1 py-1 bg-color-one text-white rounded-md"
                          >
                            Save Image
                          </button>
                          <button
                            className="border-2 py-1 px-1 rounded-md bg-color-five"
                            onClick={() => setStateChange(false)}
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
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full px-3 md:px-0">
            <div className="flex flex-col w-full md:flex-row justify-center">
              <label>
                First name
                <input
                  id="first_name"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="first_name"
                  onChange={onchange}
                  value={formData.first_name}
                  disabled
                />
              </label>
              <label className="mt-2 md:mt-0">
                Last name
                <input
                  id="last_name"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={onchange}
                  disabled
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                Email
                <input
                  id="email"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={onchange}
                />
                <h1>(Email only visible to you)</h1>
              </label>
              <label className="mt-2">
                Country & Region
                <div className="flex">
                  <div className="md:ml-1 w-56 md:w-full">
                    <CountryDropdown
                      style={{
                        padding: "5px",
                        marginTop: 4,
                        width: 300,
                        height: 45,
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                      defaultOptionLabel={defaultCountry}
                      value={country}
                      onChange={(val) => setCountry(val)}
                    />
                  </div>
                  <div className="md:ml-1 mt-1 w-24 ml-6">
                    <RegionDropdown
                      style={{
                        height: 45,
                        width: 80,
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      }}
                      defaultOptionLabel={defaultRegion}
                      country={country}
                      value={region}
                      onChange={(val) => setRegion(val)}
                    />
                  </div>
                </div>
              </label>
            </div>

            <div className="flex justify-center mt-3 flex-col md:mr-10 w-full md:px-9">
              <h1>Job Title</h1>
              <input
                id="job_title"
                className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-full sm:text-sm"
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={onchange}
                disabled
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                LinkedIn
                <input
                  id="linkedIn"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="linkedIn"
                  onChange={onchange}
                  value={formData.linkedIn}
                  disabled
                />
              </label>
              <label className="mt-2">
                Twitter
                <input
                  id="twitter"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={onchange}
                  disabled
                />
              </label>
            </div>

            <div className="ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9">
              <label
                htmlFor="message"
                className="block mt-4 mb-2 text-sm font-medium"
              ></label>
              Goal
              <textarea
                id="goal"
                rows={4}
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                disabled
                className="placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-50 rounded-lg border-2 focus:outline-none focus:ring-dark-500 focus:ring-1"
              ></textarea>
              <h1 className="mt-2 text-sm">
                It's good practice to build mentorship around a long-term goal
                of yours. This is shared with mentors.
              </h1>
            </div>

            <div className="md:px-9 md:py-2">
              <h1 className="font-bold">
                In general, when do you prefer to meet your mentor?
              </h1>
              <div className="flex items-center mt-4" onClick={changeState}>
                <input
                  id="default-radio-1"
                  type="radio"
                  className="w-4 h-4"
                  name="radio1"
                  value="Early mornings (before 9am)"
                  onChange={onchange}
                  checked={radioDefault === "Early mornings (before 9am)"}
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-md font-medium text-gray-900"
                >
                  Early mornings (before 9am)
                </label>
              </div>

              <div className="flex items-center mt-2" onClick={changeState}>
                <input
                  id="default-radio-2"
                  type="radio"
                  className="w-4 h-4"
                  name="radio2"
                  value="During the day (between 9am and 5pm)"
                  onChange={onchange}
                  checked={
                    radioDefault === "During the day (between 9am and 5pm)"
                  }
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-md font-medium text-gray-900"
                >
                  During the day (between 9am and 5pm)
                </label>
              </div>
              <div className="flex items-center mt-2" onClick={changeState}>
                <input
                  id="default-radio-3"
                  type="radio"
                  className="w-4 h-4"
                  name="radio"
                  value="In the evenings (after 5pm)"
                  onChange={onchange}
                  checked={radioDefault === "In the evenings (after 5pm)"}
                />
                <label
                  htmlFor="default-radio-3"
                  className="ms-2 text-md font-medium text-gray-900"
                >
                  In the evenings (after 5pm)
                </label>
              </div>
              <div className="flex items-center mt-2" onClick={changeState}>
                <input
                  id="default-radio-4"
                  type="radio"
                  className="w-4 h-4"
                  value="I'm flexible"
                  name="radio"
                  onChange={onchange}
                  checked={radioDefault === "I'm flexible"}
                />
                <label
                  htmlFor="default-radio-4"
                  className="ms-2 text-md font-medium text-gray-900"
                >
                  I'm Flexible
                </label>
              </div>
              <div className="flex items-center mt-2" onClick={changeState}>
                <input
                  id="default-radio-5"
                  type="radio"
                  className="w-4 h-4"
                  value="Other"
                  name="radio"
                  onChange={onchange}
                  checked={radioDefault === "Other"}
                />
                <label
                  htmlFor="default-radio-5"
                  className="ms-2 text-md font-medium text-gray-900"
                >
                  Other
                </label>
              </div>
            </div>

            <div className="mt-5 flex md:justify-end justify-center md:px-9">
              {stateChange == true ? (
                <>
                  <button
                    type="submit"
                    id="saveBtn"
                    className="border-2 px-1 py-1 md:px-2 md:py-2 rounded-md bg-color-five text-white mb-4"
                    onClick={() => setStateChange(false)}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    id="saveBtn"
                    className="border-2 px-1 py-1 md:px-2 md:py-2 rounded-md bg-color-one text-white mb-4"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
