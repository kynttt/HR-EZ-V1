import * as pdfjs from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    // Handle image files
    if (file.type.startsWith('image/')) {
      return await extractTextFromImage(file);
    }
    
    // Handle PDF files
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    }

    // Handle Word documents
    if (file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await extractTextFromWord(file);
    }

    throw new Error('Unsupported file type');
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error('Failed to extract text from file');
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

async function extractTextFromImage(file: File): Promise<string> {
  try {
    // For images, we'll use OCR (Optical Character Recognition)
    // You'll need to implement this using a service like Tesseract.js or an API
    // For now, we'll return a placeholder message
    return `[Image file: ${file.name}] This is an image file. OCR processing is required to extract text.`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image file');
  }
}

async function extractTextFromWord(file: File): Promise<string> {
  try {
    // For Word documents, you'll need to implement text extraction
    // You can use libraries like mammoth.js or docx.js
    // For now, we'll return a placeholder message
    return `[Word document: ${file.name}] This is a Word document. Text extraction is required.`;
  } catch (error) {
    console.error('Error processing Word document:', error);
    throw new Error('Failed to process Word document');
  }
} 