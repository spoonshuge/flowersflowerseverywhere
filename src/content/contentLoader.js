import Papa from 'papaparse';
import DOMPurify from 'dompurify';
import fallbackContent from './fallback-content.json';

// Get sheet URL from environment variable
const SHEET_URL = import.meta.env.VITE_SHEET_URL;

let isFallbackMode = false;

/**
 * Sanitize content to prevent XSS attacks
 */
export const sanitizeContent = (content) => {
  if (typeof content === 'string') {
    return DOMPurify.sanitize(content, { ALLOWED_TAGS: [] });
  }
  return content;
};

/**
 * Parse Google Sheets data from CSV format
 */
const parseSheetData = (csvData) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

/**
 * Fetch data from Google Sheets public CSV endpoint
 */
const fetchGoogleSheet = async (sheetUrl) => {
  try {
    // Convert Google Sheets URL to CSV export format if needed
    let csvUrl = sheetUrl;
    
    if (sheetUrl.includes('docs.google.com/spreadsheets')) {
      // Extract sheet ID
      const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const sheetId = match[1];
        // Get gid if specified (for specific tabs)
        const gidMatch = sheetUrl.match(/[#&]gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : '0';
        csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      }
    }

    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvData = await response.text();
    return await parseSheetData(csvData);
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    throw error;
  }
};

/**
 * Transform raw sheet data into structured content object
 */
const transformSheetData = (rawData) => {
  const content = {
    site_meta: {},
    home: {},
    about: {},
    approach: {},
    services: [],
    faqs: [],
    contact: {},
  };

  // Process each row based on structure
  rawData.forEach(row => {
    const { page, section, field, value, key } = row;
    
    // Handle site_meta (key-value pairs)
    if (key && value) {
      content.site_meta[sanitizeContent(key)] = sanitizeContent(value);
    }
    
    // Handle page content
    if (page && section && field && value) {
      const sanitizedValue = sanitizeContent(value);
      
      if (!content[page]) {
        content[page] = {};
      }
      
      if (!content[page][section]) {
        content[page][section] = {};
      }
      
      content[page][section][field] = sanitizedValue;
    }
  });

  return content;
};

/**
 * Load content from Google Sheets with fallback to local JSON
 */
export const loadContent = async () => {
  // If no sheet URL is configured, use fallback immediately
  if (!SHEET_URL || SHEET_URL === 'undefined') {
    console.warn('No Google Sheet URL configured. Using fallback content.');
    isFallbackMode = true;
    return fallbackContent;
  }

  try {
    console.log('Attempting to fetch content from Google Sheets...');
    const rawData = await fetchGoogleSheet(SHEET_URL);
    const content = transformSheetData(rawData);
    
    // If transformation resulted in mostly empty content, use fallback
    if (Object.keys(content.site_meta).length === 0) {
      console.warn('Fetched content appears empty. Using fallback.');
      isFallbackMode = true;
      return fallbackContent;
    }
    
    console.log('Successfully loaded content from Google Sheets');
    isFallbackMode = false;
    return content;
  } catch (error) {
    console.error('Failed to load content from Google Sheets:', error);
    console.log('Using fallback content...');
    isFallbackMode = true;
    return fallbackContent;
  }
};

/**
 * Check if currently using fallback content
 */
export const isUsingFallback = () => isFallbackMode;

/**
 * Validate image path
 */
export const validateImagePath = (path) => {
  if (!path || typeof path !== 'string') return false;
  
  // Check if it's a relative path starting with 'images/'
  if (path.startsWith('images/')) return true;
  
  // Check if it's an absolute URL
  if (path.startsWith('http://') || path.startsWith('https://')) return true;
  
  return false;
};

/**
 * Get image URL with proper base path handling
 */
export const getImageUrl = (imagePath) => {
  if (!validateImagePath(imagePath)) {
    console.warn(`Invalid image path: ${imagePath}`);
    return null;
  }
  
  // If it's an absolute URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For relative paths, prepend the base path
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${imagePath}`.replace(/\/+/g, '/');
};
