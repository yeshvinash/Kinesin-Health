import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';

const ModalBody = ({ imageData, onHide }) => {
    const handlePrint = () => {
      
    function ImageToPrint(source)
    {
        return "<html><head><scri"+"pt>function step1(){\n" +
                "setTimeout('step2()', 10);}\n" +
                "function step2(){window.print();window.close()}\n" +
                "</scri" + "pt></head><body onload='step1()'>\n" +
                "<img src='" + imageData + "' /></body></html>";
    }
        // const printWindow = window.open('', '_blank');
        // printWindow.document.write(`
        //   <html>
        //     <head>
        //       <title>Print Preview</title>
        //       <style>
        //         img {
        //           width: 100%;
        //         }
        //       </style>
        //     </head>
        //     <body>
        //       <img src="${imageData}" />
        //     </body>
        //   </html>
        // `);
        // // printWindow.document.close();
        // printWindow.print();
        // printWindow.close();
        var Pagelink = "about:blank";
        var pwa = window.open(Pagelink, "_new");
        pwa.document.open();
        pwa.document.write(ImageToPrint(imageData));
        pwa.document.close();
      };
  
    const handleDownload = async () => {
      try {
        const response = await fetch(imageData);
        const blob = await response.blob();
        saveAs(blob, 'document.png');
      } catch (error) {
        console.error('Error downloading document:', error);
      }
    };
  
    return (
      <div>
        <img src={imageData} alt="Document Preview" style={{ maxWidth: '100%' }} />
        <div className="modal-button-group">
          <Button  onClick={handlePrint} className='custom_btn'>Print</Button>
          <Button  onClick={handleDownload} className='custom_btn'>Download</Button>
          {/* <Button variant="secondary" onClick={onHide}>Close</Button> */}
        </div>
      </div>
    );
  };
  

const PreviewModal = ({ show, onHide, imageData }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" className='preview-modal custom-modal-wrap' centered>
      <Modal.Header closeButton>
        <Modal.Title>Preview Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalBody imageData={imageData} />
      </Modal.Body>
    </Modal>
  );
};

export default PreviewModal;
