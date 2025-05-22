declare module 'pdf-parse' {
  export interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    IsCollectionPresent: boolean;
    Title?: string;
    Author?: string;
    Subject?: string;
    Keywords?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModificationDate?: string;
  }

  export interface PDFMetadata {
    'dc:format'?: string;
    'pdf:producer'?: string;
    'pdf:encrypted'?: boolean;
    'xmp:createdate'?: string;
    'xmp:modifydate'?: string;
    'xmp:metadatadate'?: string;
    'xmp:creator'?: string;
    'xmp:title'?: string;
    'xmp:author'?: string;
    'xmp:subject'?: string;
    'xmp:keywords'?: string;
  }

  export interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata: PDFMetadata;
    version: string;
  }

  export interface PDFParseOptions {
    pagerender?: (pageData: unknown) => string;
    max?: number;
    version?: string;
  }

  function PDFParse(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFData>;
  export = PDFParse;
} 