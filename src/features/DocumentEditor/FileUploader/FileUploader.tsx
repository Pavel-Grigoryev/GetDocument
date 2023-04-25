import React, { ChangeEvent, FC, useRef } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

type PropsType = {
  file: Docxtemplater | null;
  uploadFile: (newfile: Docxtemplater) => void;
};

export const FileUploader: FC<PropsType> = ({ file, uploadFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const newfile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        debugger;
        const zip = new PizZip(data);
        const doc = new Docxtemplater().loadZip(zip);

        console.log('file: ', doc);
        uploadFile(doc);
      };
      reader.readAsArrayBuffer(newfile);
    }
  };

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click();
  };

  return (
    <div>
      <h1 className={'fs-3'}>Original document</h1>
      <div className={'d-flex flex-wrap justify-content-between align-items-center gap-3'}>
        <button type="button" className="btn btn-primary" onClick={selectFileHandler}>
          upload file
        </button>
        <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
        {file && <p className={`my-0 fw-semibold transition-opacity`}>File name: </p>}
      </div>
    </div>
  );
};
