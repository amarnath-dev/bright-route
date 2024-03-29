import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MenteeProfileCard } from "../../componets/mentee/MenteeProfileCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import NavBar from "../../componets/navbar/Navbar";
import NoImage from "../../assets/no-profile-image.png"


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
import Swal from "sweetalert2";

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

const MenteeProfile = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const axiosPrivate = useAxiosPrivate();
  const [controlCrop, setControlCrop] = useState(false);
  const [goal, setGoal] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_profileImg, setProfileImg] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef("");
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);

  const [menteeEmail, setMenteeEmail] = useState<string>("");
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
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/managment/${user?._id}`, {
          withCredentials: true,
        });
        const details = response.data.menteeDetails[0];
        setGoal(details.menteeProfile?.goal);
        setProfileImg(details.menteeProfile?.profile_img);
        setFormdata(details.menteeProfile);
        setMenteeEmail(details?.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [axiosPrivate, user?._id]);

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
          });
      }
    };
    fetchImg();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        formData.goal = goal;
        try {
          const response = await axiosPrivate.post(
            "/managment/profie-update",
            formData,
            {
              withCredentials: true,
            }
          );
          if (response) {
            const reqRes = response.data;
            if (reqRes.status === "success") {
              Swal.fire("Saved!", "", "success");
            }
          }
        } catch (error) {
          Swal.fire("Unable to save the changes", "", "error");
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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

      const imgId =
        Math.random().toString(16).slice(2) +
        (new Date().getTime() / 1000).toString();
      const reference = ref(storage, imgId);
      const snapshot = await uploadBytes(reference, blob);
      if (snapshot.metadata) {
        const img_firebase_id: string = snapshot.metadata.fullPath;
        const response = await axiosPrivate.post(
          "/managment/profieImage-update",
          { img_firebase_id },
          { withCredentials: true }
        );
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          location.reload();
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
      {/* <ToastContainer className="w-40 md:w-80" /> */}
      <NavBar />
      <div className="w-full h-full flex justify-center bg-background-two">
        <div className="w-full md:w-2/3 h-full border border-gray-500 mt-10 rounded-md">
          <div className="w-full h-full flex justify-center flex-col">
            <h1 className="text-center mt-4 text-md md:text-lg font-bold text-white">
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
          </div>
          {formData?.profile_img ? (
            ""
          ) : (
            <div className="flex flex-col ml-6">
              <h1 className="font-bold text-white">
                Please Add a profile Image
              </h1>
            </div>
          )}
          <div className="px-2 md:px-5 md:py-2 flex items-center">
            <div className="flex w-full flex-row items-center">
              <span className="flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4">
                <img
                  src={
                    formData?.profile_img
                      ? ""
                      : NoImage
                  }
                  alt="profile_img"
                  className="md:h-28 md:w-28 rounded-full object-cover"
                  id="profile-image"
                />
              </span>

              <div className="px-6 md:px-0 w-full">
                <Button
                  onClick={() => setControlCrop(true)}
                  id="img_btn"
                  style={{
                    background: "rgb(31 41 55)",
                    color: "white",
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

                {controlCrop ? (
                  <div>
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
                            onClick={() => setControlCrop(false)}
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
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full px-3 md:px-0">
            <div className="flex flex-col w-full md:flex-row justify-center text-gray-400">
              <label>
                <span className="text-gray-400">First Name</span>
                <input
                  id="first_name"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="first_name"
                  onChange={onchange}
                  value={formData.first_name}
                />
              </label>
              <label className="mt-2 md:mt-0">
                <span className="text-gray-400">Last name</span>
                <input
                  id="last_name"
                  className="placeholder:text-black text-white field mt-1 block bg-gray-800 border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="last_name"
                  value={formData?.last_name}
                  onChange={onchange}
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                <span className="text-gray-400">Email</span>
                <input
                  id="email"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="email"
                  disabled
                  value={menteeEmail}
                  onChange={onchange}
                />
              </label>
              <label className="mt-2">
                <span className="text-gray-400">Job Title</span>
                <input
                  id="job_title"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3"
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={onchange}
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                <span className="text-gray-400">LinkedIn</span>
                <input
                  id="linkedIn"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="linkedIn"
                  onChange={onchange}
                  value={formData.linkedIn}
                />
              </label>
              <label className="mt-2">
                <span className="text-gray-400">Twitter</span>
                <input
                  id="twitter"
                  className="placeholder:text-black field mt-1 block bg-gray-800 border-gray-800 text-white rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={onchange}
                />
              </label>
            </div>

            <div className="ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9">
              <label
                htmlFor="message"
                className="block mt-4 mb-2 text-sm font-medium"
              ></label>
              <span className="text-gray-400">Goal</span>
              <textarea
                id="goal"
                rows={4}
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-800 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-dark-500 focus:ring-1"
              ></textarea>
              <h1 className="mt-2 text-sm text-white">
                It's good practice to build mentorship around a long-term goal
                of yours. This is shared with mentors.
              </h1>
            </div>
            <div className="flex md:justify-end justify-center md:px-9">
              <button
                type="submit"
                id="saveBtn"
                className="px-2 py-2 md:px-2 md:py-2 rounded-md bg-color-five text-white mb-4"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MenteeProfile;
