"use client";
import React from 'react';
import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilesUploader from './components/FileUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


function Home() {
  //It should store all urls of the uploaded PDFs
  const [urls, setUrls] = React.useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      // This is a sample
      // File Name: Grduation certificate.pdf, File URL: blob:http://localhost:3000/1fdd2b64-6ebc-48e3-94aa-e4d6743f2f9f
      const fileUrls = Array.from(files).map(file => {
        const fileUrl = URL.createObjectURL(file);
        console.log(`File Name: ${file.name}, File URL: ${fileUrl}`); // Print file name and URL
        return fileUrl;
      });
      // Update the urls  = prev + current
      setUrls(prevUrls => [...prevUrls, ...fileUrls]);
    }
  };

  const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    // This method prevents the default action that occurs when an element is dropped. 
    // For example, the browser might try to open the file instead of processing it. 
    // By calling this method, you ensure that your custom logic is executed instead.
    e.preventDefault();
    //This method stops the event from bubbling up to parent elements. 
    // It prevents any parent handlers from being triggered by the same event, 
    //ensuring only your drag-and-drop logic runs.
    e.stopPropagation();
    const files = e.dataTransfer.files;
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');

    if (pdfFiles.length > 0) {
      // Create a DataTransfer object to convert the array back to a FileList
      const dataTransfer = new DataTransfer();
      pdfFiles.forEach(file => dataTransfer.items.add(file));

      handleFiles(dataTransfer.files); // Pass the FileList
    } else {
      alert("Please drop only PDF files.");
    }

  }, []);

  const onDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDelete = (url: string) => {
    setUrls(prevUrls => prevUrls.filter(existingUrl => existingUrl !== url));
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <div className="container">
        <div className="row">
          <h1 className={`${styles.websiteName} col-12 text-center`}>Camscanner Watermark Remover</h1>
        </div>
        <div className="row">
          <h1 className={`${styles.instructions} col-12 text-center`}>Upload multiple PDFs to delete their watermark</h1>
          <h1 className={`${styles.instructionsPdfServer} col-12 text-center`}>No PDFs are sent to the server</h1>
        </div>
        <FilesUploader urls={urls} onDrop={onDrop} onDragOver={onDragOver} onChange={onChange} onDelete={onDelete} />
      </div>
      <div className={`${styles.socialIcons} position-absolute top-0 end-0 p-3`}>
        <a href="https://www.linkedin.com/in/ahmed23adel/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-white me-3" />
        </a>
        <a href="https://github.com/Ahmed23Adel" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-white" />
        </a>
      </div>
    </div>
  );
}
export default Home;

