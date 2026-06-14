import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for storing JSON data (backend/data)
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

/**
 * Saves form submission data as a JSON file in the backend.
 * Files are organized by formType in directories.
 * 
 * @param {string} formType - Type of form (e.g., 'applications', 'contacts', 'newsletters', 'dealerships')
 * @param {object} data - Form submission data payload
 */
export const saveJsonSubmission = async (formType, data) => {
  try {
    const targetDir = path.join(DATA_DIR, formType);
    
    // Ensure the folder exists
    await fs.mkdir(targetDir, { recursive: true });
    
    // Create filename: timestamp + random characters to ensure uniqueness
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}_${randomStr}.json`;
    
    const filePath = path.join(targetDir, filename);
    
    // Add submission metadata
    const enrichedData = {
      _savedAt: new Date().toISOString(),
      ...data,
    };
    
    // Write formatted JSON data
    await fs.writeFile(filePath, JSON.stringify(enrichedData, null, 2), 'utf-8');
    console.log(`Saved ${formType} submission to JSON file: ${filePath}`);
  } catch (error) {
    console.error(`Failed to save JSON submission for ${formType}:`, error);
  }
};
