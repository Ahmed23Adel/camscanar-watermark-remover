import React from 'react';
import styles from './FileUploader.module.css';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { removeWatermarkFromPDF } from './watermarkRemoval';

interface FilesUploaderProps {
    urls: string[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (url: string) => void;
}

const FilesUploader: React.FC<FilesUploaderProps> = ({ urls, onDrop, onDragOver, onChange, onDelete }) => {
    const handleDownload = async (url: string, index: number) => {
        const response = await fetch(url);
        const pdfBytes = await response.arrayBuffer();
        const modifiedPdfBytes = await removeWatermarkFromPDF(pdfBytes);

        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `document_${index + 1}_noWatermark.pdf`;
        link.click();
    };

    const handleDownloadAll = async () => {
        for (let i = 0; i < urls.length; i++) {
            await handleDownload(urls[i], i);
        }
    };

    return (
        <>
            <div
                className={`${styles.uploadArea} text-center mb-4`}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <input type="file" accept=".pdf" multiple onChange={onChange} className={styles.fileInput} id="file-input" />
                <span>Drag and drop PDFs here, or</span>
                <label htmlFor="file-input" className="btn btn-primary mx-2">Click to upload</label>
            </div>
            {urls.length > 0 && (
                <div className="text-center mb-4">
                    <button className="btn btn-success" onClick={handleDownloadAll}>
                        Remove watermark and download all
                    </button>
                </div>
            )}
            <div className="row mt-4">
                {urls.length > 0 ? (
                    urls.map((url, index) => (
                        <div key={index} className="col-6 col-md-4 mb-4 position-relative">
                            <div className={styles.pdfViewer}>
                                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                    <Viewer fileUrl={url} />
                                </Worker>
                            </div>
                            <button
                                className={`btn btn-danger position-absolute top-0 end-0 m-2`}
                                onClick={() => onDelete(url)}
                                title="Remove PDF"
                            >
                                X
                            </button>
                            <button
                                className="btn btn-success w-100 mt-2"
                                onClick={() => handleDownload(url, index)}
                            >
                                Remove watermark and download
                            </button>
                        </div>
                    ))
                ) : (
                    <div className={`${styles.previewArea} col-12 text-center`}>
                        Preview area
                    </div>
                )}
            </div>
        </>
    );
};

export default FilesUploader;
