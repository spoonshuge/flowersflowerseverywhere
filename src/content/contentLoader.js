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
 * Fetch data from Google Sheets and parse sections
 */
const fetchGoogleSheet = async (sheetUrl) => {
  try {
    console.log('Fetching from URL:', sheetUrl);
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvData = await response.text();
    const allRows = await parseSheetData(csvData);
    
    // Parse sections from single-tab format
    // Structure: section header row, then column headers, then data rows
    const sections = {};
    let currentSection = null;
    let currentColumns = [];
    
    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];
      const firstCol = Object.values(row)[0];
      const otherCols = Object.values(row).slice(1);
      const hasOnlyFirstCol = firstCol && otherCols.every(v => !v || v.trim() === '');
      
      // Check if this is a section header (only first column has value)
      if (hasOnlyFirstCol && firstCol.trim()) {
        currentSection = firstCol.trim();
        sections[currentSection] = [];
        // Next row should be column headers
        if (i + 1 < allRows.length) {
          currentColumns = Object.keys(allRows[i + 1]).filter(key => allRows[i + 1][key]);
          i++; // Skip the header row
        }
        continue;
      }
      
      // If we're in a section and this row has data, add it
      if (currentSection && firstCol) {
        sections[currentSection].push(row);
      }
    }
    
    console.log('Parsed sections:', Object.keys(sections));
    Object.keys(sections).forEach(section => {
      console.log(`✓ Loaded ${section} (${sections[section].length} rows)`);
    });
    
    return sections;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    throw error;
  }
};

/**
 * Transform tab-based sheet data into structured content object
 */
const transformSheetData = (tabData) => {
  const content = {
    site_meta: {},
    home: {},
    about: {},
    approach: {},
    services: [],
    faqs: [],
    contact: {},
  };

  // Process site_meta (key-value pairs)
  if (tabData.site_meta) {
    tabData.site_meta.forEach(row => {
      if (row.key && row.value) {
        content.site_meta[sanitizeContent(row.key)] = sanitizeContent(row.value);
      }
    });
  }

  // Helper to process page tabs (section/field/value structure)
  const processPageTab = (data, pageName) => {
    if (!data) return {};
    const page = {};
    
    data.forEach(row => {
      if (row.section && row.field && row.value) {
        if (!page[row.section]) {
          page[row.section] = {};
        }
        page[row.section][row.field] = sanitizeContent(row.value);
      }
    });
    
    return page;
  };

  // Process home page
  content.home = processPageTab(tabData.home_page, 'home');

  // Process about page
  content.about = processPageTab(tabData.about_page, 'about');

  // Process approach page
  content.approach = processPageTab(tabData.approach_page, 'approach');

  // Process services (array of objects)
  if (tabData.services) {
    content.services = tabData.services
      .filter(row => row.id && row.title)
      .map(row => ({
        id: sanitizeContent(row.id),
        title: sanitizeContent(row.title),
        emoji: row.emoji || '',
        description: sanitizeContent(row.description || ''),
        details: sanitizeContent(row.details || ''),
        rate: sanitizeContent(row.rate || ''),
        image: sanitizeContent(row.image || ''),
        imageAlt: sanitizeContent(row.imageAlt || ''),
        order: parseInt(row.order) || 0
      }))
      .sort((a, b) => a.order - b.order);
  }

  // Process FAQs (array of objects)
  if (tabData.faqs) {
    content.faqs = tabData.faqs
      .filter(row => row.question && row.answer)
      .map(row => ({
        question: sanitizeContent(row.question),
        answer: sanitizeContent(row.answer),
        order: parseInt(row.order) || 0
      }))
      .sort((a, b) => a.order - b.order);
  }

  // Process contact (field-value pairs)
  if (tabData.contact) {
    tabData.contact.forEach(row => {
      if (row.field && row.value) {
        content.contact[sanitizeContent(row.field)] = sanitizeContent(row.value);
      }
    });
  }

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
