import React from 'react';
import { DocumentEditor } from '../../features/DocumentEditor/DocumentEditor';

export const Main = () => {
  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 my-md-7 my-6">
            <DocumentEditor />
          </div>
        </div>
      </div>
    </main>
  );
};
