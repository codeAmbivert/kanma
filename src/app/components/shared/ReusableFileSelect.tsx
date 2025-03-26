"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CloseIcon, PictureIcon } from "../../../../public/icons/iconsExport";

const Viewer = dynamic(
  () => import("react-viewer"),
  { ssr: false } // This line is important
);

interface FileUploadProps {
  files: File[] | null;
  error: string | any;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (i: number) => void;
  noFileText?: string;
  label: string | React.ReactNode;
  acceptedFilesText?: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  error,
  onChange,
  onRemove,
  name,
  noFileText,
  label,
  acceptedFilesText,
  accept = ".jpg,.png,.pdf,.svg",
}) => {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string[] | null>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string[] | null>(null);
  const [openFileModal, setOpenFileModal] = useState<null | number>(null);

  const handlePdfPreview = (i: number) => {
    if (pdfPreviewUrl) {
      window.open(pdfPreviewUrl[i], "_blank");
    }
  };

  useEffect(() => {
    if (files) {
      files.forEach((file) => {
        const fileType = file.type;
        if (fileType === "application/pdf") {
          setPdfPreviewUrl((prev) =>
            prev
              ? [...prev, URL.createObjectURL(file)]
              : [URL.createObjectURL(file)]
          );
          setImgPreviewUrl(null);
        } else {
          setImgPreviewUrl((prev) =>
            prev
              ? [...prev, URL.createObjectURL(file)]
              : [URL.createObjectURL(file)]
          );
          setPdfPreviewUrl(null);
        }
      });
    }
  }, [files]);

  const handleClosePreviewModal = () => {
    setOpenFileModal(null);
  };

  return (
    <div className="w-full">
      <div className="text-[14px] mb-2">{label}</div>
      {files && files?.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {files.map((file, i) => (
              <div
                onClick={() =>
                  pdfPreviewUrl ? handlePdfPreview(i) : setOpenFileModal(i)
                }
                className="bg-gradient-to-t to-[#25CD2566] from-[#ffffff] border border-dashed rounded-md w-full min-h-[120px] justify-center flex flex-col items-center cursor-pointer relative p-4"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(i);
                  }}
                  className="h-5 w-5 flex justify-center items-center absolute top-2 right-2"
                >
                  <CloseIcon className="h-4 w-4 text-red-600" />
                </div>
                <PictureIcon className="h-[21.5px] w-[25.5px]" />
                <p className="text-center text-[14px] font-medium mt-3 max-w-[159px]">
                  Click to preview
                </p>
                <p className="text-center text-[14px] font-medium mt-3">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
          <label className="bg-gradient-to-t to-[#25CD2566] from-[#ffffff] border border-dashed rounded-md w-full h-[120px] justify-center flex flex-col items-center cursor-pointer mt-5">
            <PictureIcon className="h-[21.5px] w-[25.5px]" />
            <p className="text-center text-[14px] font-medium mt-3 max-w-[159px]">
              {noFileText ? noFileText : "Upload document"}
            </p>
            <input
              type="file"
              name={name}
              className="hidden"
              accept={accept}
              multiple
              onChange={onChange}
            />
          </label>
        </div>
      ) : (
        <label className="bg-gradient-to-t to-[#25CD2566] from-[#ffffff] border border-dashed rounded-md w-full h-[120px] justify-center flex flex-col items-center cursor-pointer">
          <PictureIcon className="h-[21.5px] w-[25.5px]" />
          <p className="text-center text-[14px] font-medium mt-3 max-w-[159px]">
            {noFileText ? noFileText : "Upload document"}
          </p>
          <input
            type="file"
            name={name}
            className="hidden"
            accept={accept}
            multiple
            onChange={onChange}
          />
        </label>
      )}

      {error ? (
        <p className="text-red-600 text-xs mt-2">{error}</p>
      ) : (
        <>
          {acceptedFilesText ? (
            <p className="text-[14px] text-cwGrayText2 mt-2">
              {acceptedFilesText}
            </p>
          ) : (
            ""
          )}
        </>
      )}

      {openFileModal !== null && (
        <>
          {typeof window !== "undefined" &&
          typeof openFileModal === "number" &&
          imgPreviewUrl &&
          imgPreviewUrl.length > 0 ? (
            <Viewer
              visible={typeof openFileModal === "number"}
              onClose={handleClosePreviewModal}
              images={[imgPreviewUrl[openFileModal]].map((item) => ({
                src: item,
                key: item,
              }))}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default FileUpload;
