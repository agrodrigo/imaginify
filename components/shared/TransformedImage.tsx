import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

function TransformedImage({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) {
  const downloadHandler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-betwenn">
        <h3 className="h3-bold text-dark-600">Transformado</h3>
        {hasDownload && (
          <button className="download-btn" onClick={downloadHandler}>
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>
      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image?.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              if (setIsTransforming) setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                if (setIsTransforming) setIsTransforming(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
              />
              <p>Aguarde, por favor...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Imagem Transformada</div>
      )}
    </div>
  );
}

export default TransformedImage;
