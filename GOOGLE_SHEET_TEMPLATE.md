# Google Sheets Content Template

This document provides the exact structure and example content for your Google Sheets content management system.

## 📋 Quick Setup Guide

1. Create a new Google Sheet
2. Create tabs with the exact names below
3. Copy the column headers for each tab
4. Fill in your content following the examples
5. Publish to web: **File → Share → Publish to web**
6. Copy the published URL and add to environment variables

---

## Tab 1: site_meta

**Purpose**: Global site settings and metadata

**Columns**: `key` | `value`

### Required Rows

| key | value |
|-----|-------|
| siteTitle | Professional Counseling Services |
| tagline | Experiential Therapy for Healing & Growth |
| phone | (555) 123-4567 |
| email | contact@example.com |
| address | 6065 Lake Forrest Drive NW, Suite 250, Sandy Springs, GA 30328 |
| ctaLabel | Schedule Consultation |
| primaryColor | #2a7650 |

### Optional Rows

| key | value |
|-----|-------|
| facebook | https://facebook.com/yourpage |
| instagram | https://instagram.com/yourpage |
| linkedIn | https://linkedin.com/in/yourprofile |

---

## Tab 2: home_page

**Purpose**: Home page content

**Columns**: `section` | `field` | `value` | `order`

### Example Content

| section | field | value | order |
|---------|-------|-------|-------|
| hero | headline | Find Balance. Discover Healing. Move Forward. | 1 |
| hero | subheadline | Experiential therapy helping individuals, couples, and families in Sandy Springs, GA | 2 |
| hero | ctaText | Request a Free Consultation | 3 |
| hero | image | images/main/room0.png | 4 |
| hero | imageAlt | A quiet therapy office interior with soft natural light | 5 |
| intro | title | Welcome | 1 |
| intro | content | I am an experiential therapist and collaborative, relationally-oriented counselor... | 2 |
| offerings | title_1 | Individual Therapy | 1 |
| offerings | description_1 | 60-120 minute sessions for consistent, personalized support | 2 |
| offerings | title_2 | Intensives | 3 |
| offerings | description_2 | 1-4 day concentrated healing work for deeper transformation | 4 |
| offerings | title_3 | Therapy Groups | 5 |
| offerings | description_3 | Experiential group sessions fostering connection and growth | 6 |

---

## Tab 3: about_page

**Purpose**: About page content

**Columns**: `section` | `field` | `value` | `order`

### Example Content

| section | field | value | order |
|---------|-------|-------|-------|
| header | title | About Me | 1 |
| header | subtitle | Who Am I | 2 |
| intro | content | I am an experiential therapist and collaborative, relationally-oriented counselor... | 1 |
| promises | title_1 | First Promise | 1 |
| promises | content_1 | Because I am a firm believer that you can only take someone as far as you yourself have gone... | 2 |
| promises | title_2 | Second Promise | 3 |
| promises | content_2 | I will not suggest anything that I do not believe will be to your benefit... | 4 |
| journey | content | Prior to becoming a Nationally Certified Counselor, I obtained my psychology degree... | 1 |
| credentials | item_1 | Nationally Certified Counselor | 1 |
| credentials | item_2 | Master of Divinity - Emory University | 2 |
| credentials | item_3 | Master's Degree in Clinical Mental Health Counseling - Mercer University | 3 |
| credentials | item_4 | Psychology Degree - Hendrix College | 4 |
| focus | item_1 | Children, Adolescents, and Adults | 1 |
| focus | item_2 | Women's Issues and Relational Concerns | 2 |
| focus | item_3 | Grief & Loss | 3 |
| focus | item_4 | Trauma | 4 |
| image | path | images/about/simpsonHeadshot.avif | 1 |
| image | alt | Professional headshot | 2 |

---

## Tab 4: approach_page

**Purpose**: Approach/methodology page content

**Columns**: `section` | `field` | `value` | `order`

### Example Content

| section | field | value | order |
|---------|-------|-------|-------|
| header | title | My Approach | 1 |
| header | subtitle | Experiential & Integrative Therapy | 2 |
| description | content | I use experiential modalities to integrate humanistic, existential, and systems theories... | 1 |
| modalities | name_1 | Psychodrama | 1 |
| modalities | description_1 | Action-based therapy exploring emotions and experiences | 2 |
| modalities | name_2 | Art Therapy | 3 |
| modalities | description_2 | Creative expression as a path to healing | 4 |
| modalities | name_3 | Music Therapy | 5 |
| modalities | description_3 | Using sound and rhythm for emotional processing | 6 |
| modalities | name_4 | Brainspotting | 7 |
| modalities | description_4 | Body-based trauma processing technique | 8 |
| images | path_1 | images/approach/img0.png | 1 |
| images | alt_1 | Art therapy materials arranged on a simple table | 2 |
| images | path_2 | images/approach/img1.png | 3 |
| images | alt_2 | Sand tray therapy setup | 4 |

---

## Tab 5: services

**Purpose**: Services offered

**Columns**: `id` | `title` | `emoji` | `description` | `details` | `rate` | `image` | `imageAlt` | `order`

### Example Content

| id | title | emoji | description | details | rate | image | imageAlt | order |
|----|-------|-------|-------------|---------|------|-------|----------|-------|
| individual | Individual Therapy | 🧘 | Individual therapy is best for those who are able and willing to make an ongoing regular commitment to healing work. | 60-minute sessions; 90-minute sessions; 120-minute sessions | $150 per 60-minute session | images/services/individual0.png | Quiet therapy room with two chairs | 1 |
| intensives | Individual, Couples, & Family Intensives | 💫 | Intensives are ideal for individuals, couples, and families seeking deep, concentrated healing work. | Duration: 1-4 days; Daily commitment: 6-8 hours | $1,200-$1,500 per day | images/services/intensive0.png | Minimal retreat-like interior space | 2 |
| groups | Therapy Groups | 👥 | Groups are just as therapeutic as individual sessions and provide the added opportunity for connection. | Experiential in nature; Waiting list available | Varies | images/services/group0.png | Circle of empty chairs | 3 |

**Note**: For details with multiple items, separate with semicolons (;)

---

## Tab 6: faqs

**Purpose**: Frequently asked questions

**Columns**: `question` | `answer` | `order`

### Example Content

| question | answer | order |
|----------|--------|-------|
| What services do you offer? | I offer Individual Therapy (in person and virtual, 60-120 minutes), Individual/Couples/Family Intensives (1-4 days with 6-8 hours daily), Therapy Groups, Experiential Consultation, Professional Training, and Group Retreats and Workshops. | 1 |
| What are your fees? | Individual Therapy is $150 per 60-minute session. Intensives range from $1,200-$1,500 per day depending on length. Consultation is $150/hour. Training is $1,500/day. Group costs vary. | 2 |
| Do you take insurance? | I am a private-pay practice and do not currently accept insurance. However, I can provide a 'super bill' for potential out-of-network reimbursement through your insurance company. | 3 |
| What forms of payment do you accept? | I use Simple Practice where you can set up billing through a client portal. Accepted payment methods include: Credit/Debit Card, Cash, Check, Venmo, and PayPal. | 4 |
| Where are you located? | My physical office is at 6065 Lake Forrest Drive NW, Suite 250, Sandy Springs, GA 30328. Note: The building requires stairs to access the second floor. For those with mobility issues, virtual sessions and home visits are available. | 5 |

---

## Tab 7: contact

**Purpose**: Contact page information

**Columns**: `field` | `value`

### Example Content

| field | value |
|-------|-------|
| title | Get Started |
| subtitle | Schedule Your Free 15-Minute Consultation |
| description | Unsure if therapy is right for you? Schedule a free consultation to discuss your needs and learn how I can support your healing journey. |
| phone | (555) 123-4567 |
| email | contact@example.com |
| address | 6065 Lake Forrest Drive NW, Suite 250, Sandy Springs, GA 30328 |
| accessibilityNote | The building requires stairs to access my office on the second floor. For those with mobility issues, virtual sessions and home visits are available. |
| image | images/contactFAQ/contact0.png |
| imageAlt | Exterior of a quiet professional office building |

---

## 🖼️ Image Guidelines

### Local Images (Recommended)
- Store images in `/public/images/` directory in your project
- Reference them in Google Sheets as: `images/folder/filename.ext`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`

### External Images
- Use full URLs: `https://example.com/image.jpg`
- Must be publicly accessible
- Consider hosting on Google Drive, Imgur, or Cloudinary

### Image Organization
```
public/images/
├── about/          (headshots, credentials)
├── approach/       (modality illustrations)
├── contactFAQ/     (office exterior)
├── main/           (hero images, rooms)
└── services/       (service-specific images)
```

### Best Practices
- **Alt Text**: Always provide descriptive alt text for accessibility
- **Size**: Optimize images before uploading (recommended max 2MB)
- **Dimensions**: Hero images: 1200x800px, Cards: 800x600px
- **Format**: Use WebP or AVIF for best performance

---

## 📝 Content Writing Tips

### Headlines
- Keep concise (5-10 words)
- Action-oriented when appropriate
- Emotionally resonant but professional

### Body Copy
- Use clear, conversational language
- Break up long paragraphs
- Focus on benefits, not just features

### Accessibility
- Avoid jargon when possible
- Write at 8th-grade reading level
- Use lists for scannability

---

## 🔄 Updating Content

1. **Edit directly in Google Sheets** - No code changes needed
2. **Save** - Google Sheets auto-saves
3. **Wait 30-60 seconds** - For Google's cache to update
4. **Hard refresh browser** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. **Verify changes** - Content should appear immediately

### Common Issues

**Changes not appearing?**
- Wait a full minute for cache
- Clear browser cache completely
- Check browser console for errors
- Verify sheet is still published

**Images broken?**
- Check path spelling (case-sensitive!)
- Ensure image exists in `/public/images/`
- Verify image is accessible if external URL

---

## 🆘 Need Help?

- Refer to the main README.md
- Check the Troubleshooting section
- Contact your developer for technical issues

**Remember**: You have full control over all visible content without touching any code! 🎉
