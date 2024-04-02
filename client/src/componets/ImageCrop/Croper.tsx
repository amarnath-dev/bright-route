import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { canvasPreview } from "./CanvasPreview";
import { useDebounceEffect } from "./UseDebounceEffect";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { Modal } from "flowbite-react";
import { useAppSelector } from "../../app/hooks";

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

const Croper = () => {
  const [controlCrop, setControlCrop] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [aspect, setAspect] = useState<number | undefined>(10 / 10);
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef("");
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAppSelector((state) => state.userAuth);

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 80,
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
      setAspect(10 / 10);
      if (imgRef?.current) {
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
        const img_firebase_id: string = snapshot.metadata?.fullPath;
        const response = await axiosPrivate.post(
          "/managment/profieImage-update/",
          { img_firebase_id, role: user?.role },
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
        <Modal show={controlCrop} onClose={() => setControlCrop(false)}>
          <div>
            {!!imgSrc && (
              <Modal.Body>
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
              </Modal.Body>
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
                <div className="w-full flex justify-end">
                  <button
                    className="border py-1 px-1 rounded-sm bg-color-five mr-2"
                    onClick={() => setControlCrop(false)}
                  >
                    Discard
                  </button>
                  <button
                    onClick={onDownloadCropClick}
                    className="border px-1 py-1 bg-color-one text-white rounded-sm"
                  >
                    Save Image
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
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Croper;
