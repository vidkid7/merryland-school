# 📄 Pages Editor - Complete Guide

## Overview

The Pages Editor allows you to update content for three main pages of your website:
- **Home** - Hero section, services, programs, testimonials, stats
- **About** - Mission, vision, principal info, team members
- **Admissions** - Introduction, fees

All changes are saved to localStorage and appear immediately on your website.

---

## 🎯 How to Access

1. Login to admin panel: `http://localhost:5173/admin`
2. Click **Pages** in the sidebar (Content section)
3. Select the tab for the page you want to edit

---

## 🏠 Home Page Editor

### Editable Sections:

#### 1. Hero Section
- **Hero Title** - Main heading on homepage
- **Hero Subtitle** - Secondary heading
- **Hero Description** - Paragraph text below title
- **Background Image URL** - Hero section background image

#### 2. Services (Array)
Each service has:
- **Title** - Service name
- **Description** - Service description
- **Icon** - Icon name (e.g., FiBook, FiUsers)

**Actions:**
- Click item to expand and edit
- Click **Add Item** to create new service
- Click trash icon to delete service

#### 3. Programs (Array)
Each program has:
- **Title** - Program name
- **Description** - Program description
- **Image URL** - Program image
- **Icon** - Icon name

#### 4. Testimonials (Array)
Each testimonial has:
- **Name** - Person's name
- **Role** - Their role (e.g., Parent, Alumni)
- **Text** - Testimonial content
- **Image URL** - Person's photo

#### 5. Stats (Array)
Each stat has:
- **Label** - Stat description
- **Value** - Stat number (e.g., "1500+", "98%")

---

## 👥 About Page Editor

### Editable Sections:

#### 1. Mission
- **Mission Title** - Section heading
- **Mission Description** - Mission statement text

#### 2. Vision
- **Vision Title** - Section heading
- **Vision Description** - Vision statement text

#### 3. Principal
- **Principal Name** - Principal's full name
- **Principal Message** - Message from principal
- **Image URL** - Principal's photo

#### 4. Team Members (Array)
Each team member has:
- **Name** - Team member's name
- **Role** - Their position
- **Image URL** - Their photo

---

## 🎓 Admissions Page Editor

### Editable Sections:

#### 1. Introduction
- **Title** - Page heading
- **Description** - Introductory text

#### 2. Fees
- **Admission Fee** - One-time admission fee
- **Annual Fee** - Yearly fee
- **Monthly Fee** - Monthly tuition

---

## 💾 How to Save Changes

### Single Field Changes
1. Edit any text field
2. Click **Save Changes** button at bottom
3. Wait for "✓ Changes saved!" confirmation

### Array Item Changes
1. Click on item to expand
2. Edit fields
3. Click outside to collapse (optional)
4. Click **Save Changes** button

### Adding New Items
1. Click **Add Item** button in array section
2. Fill in all fields
3. Click **Save Changes** button

### Deleting Items
1. Click trash icon on item
2. Click **Save Changes** button

---

## 🔄 Tab Switching

When switching between tabs:
- Current tab data is automatically saved
- New tab loads latest data from storage
- No data loss when switching tabs

**Best Practice:** Click "Save Changes" before switching tabs to ensure all edits are saved.

---

## ✅ Verification

### Check if Changes Saved
1. Look for "✓ Changes saved!" message
2. Refresh admin panel - changes should persist
3. Check browser console for "Data saved to localStorage successfully"

### Check if Changes Appear on Website
1. Open public website in new tab
2. Navigate to the page you edited
3. Refresh page (F5)
4. Changes should be visible

---

## 🎨 Content Guidelines

### Text Fields
- Keep titles concise (2-5 words)
- Descriptions can be longer (1-3 sentences)
- Use proper grammar and punctuation

### Image URLs
- Use full URLs (e.g., `https://example.com/image.jpg`)
- Recommended: Use Unsplash, Pexels, or your own hosted images
- Ensure images are publicly accessible

### Icons
- Use React Icons names (e.g., FiBook, FiUsers, FiStar)
- Available icons: https://react-icons.github.io/react-icons/icons/fi/
- Icon names are case-sensitive

---

## 🐛 Common Issues

### Changes Not Saving
**Problem:** Click save but changes don't persist

**Solutions:**
- Check browser console for errors
- Verify localStorage is enabled
- Try clearing browser cache
- Check storage quota (Settings → Storage)

### Changes Not Appearing on Website
**Problem:** Saved in admin but not showing on site

**Solutions:**
- Hard refresh website (Ctrl+Shift+R)
- Clear browser cache
- Check if you're editing the correct tab
- Verify you clicked "Save Changes"

### Lost Changes After Refresh
**Problem:** Changes disappear after page refresh

**Solutions:**
- Ensure you clicked "Save Changes"
- Check if localStorage is disabled
- Verify no browser extensions blocking storage
- Check browser console for errors

### Array Items Not Updating
**Problem:** Edit array item but changes don't save

**Solutions:**
- Make sure to click "Save Changes" after editing
- Try collapsing the item before saving
- Refresh page and try again
- Check console for errors

---

## 💡 Tips & Best Practices

### Content Management
- ✅ Save frequently while editing
- ✅ Test changes on public site after saving
- ✅ Keep backup of content (use Export in Settings)
- ✅ Use descriptive titles and clear descriptions

### Images
- ✅ Use high-quality images (min 800px width)
- ✅ Optimize images before uploading to hosting
- ✅ Use consistent image sizes within sections
- ✅ Test image URLs before saving

### Array Items
- ✅ Keep arrays organized (similar length items)
- ✅ Delete unused items to keep data clean
- ✅ Use consistent formatting across items
- ✅ Test after adding/deleting items

### Performance
- ✅ Don't add too many array items (max 10-15)
- ✅ Keep descriptions concise
- ✅ Use compressed images
- ✅ Regular backups prevent data loss

---

## 📊 Data Structure

### How Data is Stored

```javascript
{
  home: {
    hero: { title, subtitle, description, backgroundImage },
    services: [{ title, desc, icon }, ...],
    programs: [{ title, desc, image, icon }, ...],
    testimonials: [{ name, role, text, image }, ...],
    stats: [{ label, value }, ...]
  },
  about: {
    mission: { title, description },
    vision: { title, description },
    principal: { name, title, image, message },
    team: [{ name, role, image }, ...]
  },
  admissions: {
    intro: { title, description },
    fees: { admission, annual, monthly }
  }
}
```

---

## 🔐 Security Notes

- Only logged-in admins can access Pages Editor
- Changes are saved locally in browser
- No server-side validation
- Always backup before major changes

---

## 📱 Mobile Editing

The Pages Editor works on mobile devices:
- Use landscape mode for better experience
- Array editors may be harder to use on small screens
- Consider using desktop for complex edits
- All features work the same on mobile

---

## 🚀 Quick Start Checklist

- [ ] Login to admin panel
- [ ] Navigate to Pages
- [ ] Select Home tab
- [ ] Edit Hero Title
- [ ] Click Save Changes
- [ ] Verify "✓ Changes saved!" appears
- [ ] Open public website
- [ ] Refresh and check changes
- [ ] ✅ If working, you're ready to edit all pages!

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify localStorage is enabled
3. Try clearing cache and reloading
4. Check `PAGES_EDITOR_TEST.md` for testing guide
5. Review `ADMIN_GUIDE.md` for general help

---

**Status:** ✅ Fully Functional & Ready to Use!

**Remember:** Always click "Save Changes" after editing! 💾
