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
    const response = await fetch(sheetUrl, {
      redirect: 'follow', // Explicitly follow redirects
      mode: 'cors',
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvData = await response.text();
    console.log('CSV data received, length:', csvData.length);
    
    const allRows = await parseSheetData(csvData);
    console.log('Total rows parsed:', allRows.length);
    
    // Parse sections from single-tab format
    // Structure: section header row, then column headers, then data rows
    // Special case: First section (site_meta) doesn't have a header - starts with data
    const sections = {
      site_meta: [] // Initialize site_meta for rows before any section header
    };
    let currentSection = 'site_meta'; // Start with site_meta
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
        console.log(`Found section header: "${currentSection}" at row ${i}`);
        // Next row should be column headers
        if (i + 1 < allRows.length) {
          currentColumns = Object.keys(allRows[i + 1]).filter(key => allRows[i + 1][key]);
          i++; // Skip the header row
        }
        continue;
      }
      
      // If we have a current section and this row has data, add it
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
  // Note: First CSV column becomes 'site_meta' (the key), second becomes '' (the value)
  if (tabData.site_meta) {
    tabData.site_meta.forEach(row => {
      const key = row['site_meta'] || row.site_meta;
      const value = row[''] || row.value;
      if (key && value) {
        content.site_meta[sanitizeContent(key)] = sanitizeContent(value);
      }
    });
    console.log('✓ Processed site_meta:', Object.keys(content.site_meta).length, 'items');
  }

  // Helper to transform nested page structure to match component expectations
  // Handles: simple fields, numbered fields that become arrays
  const flattenPageData = (nestedData) => {
    const flattened = {};
    const numberedFields = {}; // Track fields with _1, _2, etc.
    
    // First pass: collect all fields
    Object.keys(nestedData).forEach(section => {
      Object.keys(nestedData[section]).forEach(field => {
        const value = nestedData[section][field];
        
        // Check if field has a number suffix (e.g., title_1, item_2)
        const match = field.match(/^(.+)_(\d+)$/);
        if (match) {
          const baseField = match[1]; // e.g., "title", "item"
          const index = parseInt(match[2]) - 1; // Convert to 0-based index
          
          if (!numberedFields[section]) {
            numberedFields[section] = {};
          }
          if (!numberedFields[section][baseField]) {
            numberedFields[section][baseField] = [];
          }
          numberedFields[section][baseField][index] = value;
        } else {
          // Simple field - add directly
          flattened[field] = value;
        }
      });
    });
    
    // Second pass: convert numbered fields to arrays or objects
    Object.keys(numberedFields).forEach(section => {
      const sectionName = section.toLowerCase();
      
      // Handle promises (title_1/content_1 pairs)
      if (numberedFields[section].title && numberedFields[section].content) {
        flattened['promises'] = [];
        for (let i = 0; i < Math.max(numberedFields[section].title.length, numberedFields[section].content.length); i++) {
          if (numberedFields[section].title[i] || numberedFields[section].content[i]) {
            flattened['promises'].push({
              title: numberedFields[section].title[i] || '',
              content: numberedFields[section].content[i] || ''
            });
          }
        }
      }
      
      // Handle credentials/focus items (item_1, item_2, etc.)
      if (numberedFields[section].item) {
        const arrayName = section.toLowerCase() === 'credentials' ? 'credentials' : 
                         section.toLowerCase() === 'focus' ? 'areasOfFocus' : 
                         section + 'Items';
        flattened[arrayName] = numberedFields[section].item.filter(Boolean);
      }
      
      // Handle modalities (name_1/description_1 pairs)
      if (numberedFields[section].name && numberedFields[section].description) {
        flattened['modalities'] = [];
        for (let i = 0; i < Math.max(numberedFields[section].name.length, numberedFields[section].description.length); i++) {
          if (numberedFields[section].name[i] || numberedFields[section].description[i]) {
            flattened['modalities'].push({
              name: numberedFields[section].name[i] || '',
              description: numberedFields[section].description[i] || ''
            });
          }
        }
      }
      
      // Handle images (path_1/alt_1/caption_1)
      if (numberedFields[section].path) {
        flattened['images'] = [];
        for (let i = 0; i < numberedFields[section].path.length; i++) {
          if (numberedFields[section].path[i]) {
            flattened['images'].push({
              path: numberedFields[section].path[i],
              alt: (numberedFields[section].alt && numberedFields[section].alt[i]) || '',
              caption: (numberedFields[section].caption && numberedFields[section].caption[i]) || ''
            });
          }
        }
      }
    });
    
    return flattened;
  };

  // Helper to process page tabs (section/field/value structure)
  const processPageTab = (data, pageName) => {
    if (!data || data.length === 0) return {};
    
    const page = {};
    
    data.forEach(row => {
      // Column mapping: 'site_meta' = section, '' = field, '_1' = value
      const section = row['site_meta'];
      const field = row[''];
      const value = row['_1'];
      
      if (section && field && value) {
        if (!page[section]) {
          page[section] = {};
        }
        page[section][field] = sanitizeContent(value);
      }
    });
    
    console.log(`✓ Processed ${pageName}:`, Object.keys(page).length, 'sections');
    return page;
  };

  // Process home page
  const homeRaw = processPageTab(tabData.home_page, 'home');
  content.home = flattenPageData(homeRaw);

  // Process about page
  const aboutRaw = processPageTab(tabData.about_page, 'about');
  content.about = flattenPageData(aboutRaw);

  // Process approach page
  const approachRaw = processPageTab(tabData.approach_page, 'approach');
  content.approach = flattenPageData(approachRaw);

  // Process services (array of objects)
  // Column mapping: 'site_meta' = id, '' = title, '_1' = emoji, '_2' = description, etc.
  if (tabData.services) {
    content.services = tabData.services
      .filter(row => row['site_meta'] && row[''])
      .map(row => ({
        id: sanitizeContent(row['site_meta']),
        title: sanitizeContent(row['']),
        emoji: row['_1'] || '',
        description: sanitizeContent(row['_2'] || ''),
        details: sanitizeContent(row['_3'] || ''),
        rate: sanitizeContent(row['_4'] || ''),
        image: sanitizeContent(row['_5'] || ''),
        imageAlt: sanitizeContent(row['_6'] || ''),
        order: parseInt(row['_7']) || 0
      }))
      .sort((a, b) => a.order - b.order);
    console.log('✓ Processed services:', content.services.length, 'items');
  }

  // Process FAQs (array of objects)
  // Column mapping: 'site_meta' = question, '' = answer, '_1' = order
  if (tabData.faqs) {
    content.faqs = tabData.faqs
      .filter(row => row['site_meta'] && row[''])
      .map(row => ({
        question: sanitizeContent(row['site_meta']),
        answer: sanitizeContent(row['']),
        order: parseInt(row['_1']) || 0
      }))
      .sort((a, b) => a.order - b.order);
    console.log('✓ Processed faqs:', content.faqs.length, 'items');
  }

  // Process contact (field-value pairs)
  // Column mapping: 'site_meta' = field, '' = value
  if (tabData.contact) {
    tabData.contact.forEach(row => {
      const field = row['site_meta'];
      const value = row[''];
      if (field && value) {
        content.contact[sanitizeContent(field)] = sanitizeContent(value);
      }
    });
    console.log('✓ Processed contact:', Object.keys(content.contact).length, 'fields');
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
