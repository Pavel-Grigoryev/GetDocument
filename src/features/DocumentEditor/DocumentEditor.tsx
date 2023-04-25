import React, { ChangeEvent, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileUploader } from './FileUploader/FileUploader';
import { FileRedactor } from './FileRedactor/FileRedactor';
import Docxtemplater from 'docxtemplater';

export const DocumentEditor = () => {
  const [file, setFile] = useState<Docxtemplater | null>(null);

  const uploadFileHandler = (newFile: Docxtemplater) => {
    setFile(newFile);
  };

  const formik = useFormik({
    initialValues: {
      variable: '',
      value: '',
    },
    onSubmit: (values: InputValueType) => {
      console.log(values);
    },
  });

  return (
    <>
      <FileUploader file={file} uploadFile={uploadFileHandler} />
      <form onSubmit={formik.handleSubmit}>
        <div className={'d-flex'}>
          <div className="input-group">
            <label htmlFor="1">Variable</label>
            <input
              type="text"
              className="form-control"
              id="1"
              aria-describedby="helpId"
              placeholder="input a variable"
              {...formik.getFieldProps('variable')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="2">Variable</label>
            <input
              type="text"
              className="form-control"
              id="2"
              placeholder="input a value"
              {...formik.getFieldProps('value')}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Get the file
        </button>
      </form>
      <FileRedactor file={file} />
    </>
  );
};

//Types

export type InputValueType = {
  variable: string;
  value: string;
};
