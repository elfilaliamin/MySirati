import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import type { ParsedCareerData } from './importUtils';
import { extractCareerData } from './importUtils';

const parseFileContent = (
  text: string,
  fileName: string,
  onSuccess: (data: ParsedCareerData, parsed: Record<string, unknown>, name: string) => void,
  onError: (msg: string) => void
) => {
  try {
    const parsed = JSON.parse(text);
    const { data, totalCount } = extractCareerData(parsed);
    if (totalCount === 0) {
      onError('The JSON file contains no recognized career data.');
      return;
    }
    onSuccess(data, parsed, fileName);
  } catch {
    onError('Failed to parse JSON file. Please ensure it contains valid JSON.');
  }
};

const readFile = (file: File, onLoaded: (text: string) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => onLoaded(e.target?.result as string);
  reader.readAsText(file);
};

export const useImportFile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedCareerData | null>(null);
  const [rawPayload, setRawPayload] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setFileName(null);
    setParsedData(null);
    setRawPayload(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      setError('Please choose a valid .json file.');
      return;
    }
    readFile(file, (text) => {
      parseFileContent(
        text,
        file.name,
        (data, parsed, name) => {
          setError(null);
          setFileName(name);
          setParsedData(data);
          setRawPayload(parsed);
        },
        (msg) => {
          setError(msg);
          setParsedData(null);
          setRawPayload(null);
        }
      );
    });
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return { fileInputRef, fileName, parsedData, rawPayload, error, setError, resetState, processFile, handleFileInput };
};
