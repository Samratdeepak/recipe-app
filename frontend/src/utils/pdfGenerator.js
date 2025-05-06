import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdf = (elementId, imageId = null, filename = "download.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    alert("Element not found.");
    return;
  }

  const recipeImgElement = imageId ? document.getElementById(imageId) : null;
  let recipeImg = "";

  if (recipeImgElement) {
    const tempImg = new Image();
    tempImg.crossOrigin = "anonymous"; // Ensure cross-origin images are loaded
    tempImg.src = recipeImgElement.src;

    tempImg.onload = () => {
      recipeImg = tempImg.src; // Store preloaded image source
      processCanvas(element, recipeImg, filename); // Call function after image is loaded
    };

    tempImg.onerror = () => {
      console.error("Image failed to load. Skipping image in PDF.");
      processCanvas(element, "", filename); // Generate PDF without the image
    };
  } else {
    processCanvas(element, "", filename); // Generate PDF without image if missing
  }
};

const processCanvas = (element, recipeImg, filename) => {
  html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  }).then((canvas) => {
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const pageHeight = 280;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // If recipe image exists, add it to a new page
    if (recipeImg) {
      pdf.addPage();
      pdf.addImage(recipeImg, "JPEG", 10, 10, 190, 120);
    }

    pdf.save(filename);
  });
};