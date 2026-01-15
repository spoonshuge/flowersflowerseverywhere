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
 * Extract sheet ID from Google Sheets URL
 */
const extractSheetId = (sheetUrl) => {
  const match = sheetUrl.match(/\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

/**
 * Fetch a single tab from Google Sheets by gid
 */
const fetchSheetTab = async (sheetId, gid = 0) => {
  const csvUrl = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=${gid}&single=true&output=csv`;
  console.log(`Fetching tab gid=${gid} from:`, csvUrl);
  
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} for gid=${gid}`);
  }
  
  const csvData = await response.text();
  return await parseSheetData(csvData);
};

/**
 * Fetch data from multiple Google Sheets tabs
 */
const fetchGoogleSheet = async (sheetUrl) => {
  try {
    const sheetId = extractSheetId(sheetUrl);
    if (!sheetId) {
      throw new Error('Could not extract sheet ID from URL');
    }

    // Define tab structure with gid numbers
    // User needs to ensure tabs are in this order in their sheet
    const tabs = [
      { name: 'site_meta', gid: 0 },
      { name: 'home_page', gid: 1 },
      { name: 'about_page', gid: 2 },
      { name: 'approach_page', gid: 3 },
      { name: 'services', gid: 4 },
      { name: 'faqs', gid: 5 },
      { name: 'contact', gid: 6 }
    ];

    // Fetch all tabs
    const results = {};
    for (const tab of tabs) {
      try {
        const data = await fetchSheetTab(sheetId, tab.gid);
        results[tab.name] = data;
        console.log(`✓ Loaded ${tab.name} (${data.length} rows)`);
      } catch (error) {
        console.warn(`Could not load ${tab.name}:`, error.message);
        results[tab.name] = [];
      }
    }

    return results;
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
