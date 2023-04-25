import React, { FC, useEffect, useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import Docxtemplater from 'docxtemplater';

type PropsType = {
  file: Docxtemplater | null;
};
export const FileRedactor: FC<PropsType> = ({ file }) => {
  const [document, setDocument] = useState<Docxtemplater | null>(null);

  useEffect(() => {
    if (file) {
      setDocument(file);
    }
  }, [file]);

  const handleFileEdit = async () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
    };
    if (file) {
      file.render(data);

      // Download the edited document
      const buffer = file.getZip().generate({ type: 'arraybuffer' });
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      debugger;

      /* if (!file) return;
      const existingDoc = await file.arrayBuffer();
      console.log(existingDoc);
      const doc = new Document(existingDoc);

      doc.addSection({
        children: [
          new Paragraph({
            text: 'This is a new paragraph',
          }),
        ],
      });

      const buffer = await Packer.toBlob(doc);
      const url = URL.createObjectURL(buffer);
      window.open(url, '_blank');*/
    }
  };

  return (
    <div>
      <button onClick={handleFileEdit} disabled={!document}>
        Редактировать документ
      </button>
    </div>
  );
};
