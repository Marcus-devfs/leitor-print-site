import React, { ChangeEvent } from 'react';

interface DropzoneProps {
  onFileUpload: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center px-2 py-2 justify-center h-64 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center px-2 py-2 max-w-60 gap-2">
          <img
            src="./icons/upload-icon.png"
            className="h-24 h-24"
            alt="upload-logo"
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            <span className="font-semibold">Arrastar e soltar
              arquivos ou procurar</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".svg,.png,.jpg,.jpeg,.gif"
        />
      </label>
    </div>
  );
};

export default Dropzone;
