# Admin Panel Guide - Database-Free Setup

## Overview
Your admin panel is now fully functional **without requiring any database**. All data is stored locally in the browser's localStorage, making it perfect for quick deployment and testing.

## 🔐 Admin Login

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**Access URL:** `http://localhost:5173/admin` (or your deployed URL + `/admin`)

## ✨ Features

### 1. **Dashboard**
- View statistics: Total notices, published blogs, gallery images, and contact messages
- Quick overview of recent notices and blog posts

### 2. **Applications Manager**
- View all student admission applications submitted through the "Apply Now" form
- Filter by: All, Today, This Week
- View detailed application information
- Contact parents directly via email or phone
- Delete applications

### 3. **Pages Editor**
- Edit Home page content (hero section, services, programs, testimonials, stats)
- Edit About page content (mission, vision, principal message, team members)
- Edit Admissions page content (intro, fees)
- All changes reflect immediately on the website

### 4. **Notices Manager**
- Create, edit, and delete notices
- Set a notice as "Latest" (featured)
- Categorize notices: Academic, Events, Holiday, Exam, General

### 5. **Blog Manager**
- Create, edit, and delete blog posts
- Publish/unpublish posts
- Add images, categories, and HTML content
- Categories: Education, Events, Technology, Sports, Arts, News

### 6. **Gallery Manager**
- Add, edit, and delete gallery images
- Categorize images: Campus, Events, Facilities, Sports, Cultural, Academic
- Preview images before saving

### 7. **Settings Manager**
- Update school information (name, tagline, email, phone, address)
- Update social media links (Facebook, Instagram, Twitter, YouTube)
- Change admin credentials (username and password)
- **Export data** - Download all website data as JSON backup
- **Import data** - Restore from a previous backup

## 📝 How It Works

### Data Storage
- All data is stored in browser's `localStorage` under the key `subhakamana_school_data`
- Changes are automatically saved when you update any content
- Data persists across browser sessions

### Admission Form Flow
1. Visitors fill out the "Apply Now" form on the website
2. Form data is saved to localStorage with `type: 'admission'`
3. Admin can view all applications in the Applications Manager
4. Applications include: student name, DOB, grade, parent info, contact details

### Real-time Updates
- All changes made in the admin panel reflect **immediately** on the website
- No page refresh needed for most updates
- Data is synchronized through React Context

## 🔄 Data Backup & Restore

### Creating a Backup
1. Go to **Settings** → **Data Backup & Restore**
2. Click **Export Data (Backup)**
3. A JSON file will be downloaded with all your data
4. Save this file in a safe location

### Restoring from Backup
1. Go to **Settings** → **Data Backup & Restore**
2. Click **Import Data (Restore)**
3. Select your backup JSON file
4. Confirm the import (this will replace all current data)
5. Page will reload with restored data

## ⚠️ Important Notes

### Browser-Specific Storage
- Data is stored per browser and device
- If you clear browser data, all content will be lost
- **Always keep regular backups** using the export feature

### Changing Admin Credentials
1. Go to **Settings** → **Admin Credentials**
2. Update username and/or password
3. Click **Update Credentials**
4. **Remember your new credentials** - there's no password recovery!

### Deployment Considerations
- When deploying to production, the initial data comes from `src/data/initialData.js`
- After first load, all changes are stored in localStorage
- Each user's browser will have independent data storage
- For a shared admin experience, consider adding a backend database later

## 🚀 Quick Start Checklist

1. ✅ Login with default credentials
2. ✅ Change admin password in Settings
3. ✅ Update school information in Settings
4. ✅ Edit page content in Pages Editor
5. ✅ Add some notices and blog posts
6. ✅ Upload gallery images
7. ✅ Create your first data backup
8. ✅ Test the admission form from the public site

## 🐛 Troubleshooting

### Lost Admin Access
If you forget your credentials:
1. Open browser console (F12)
2. Run: `localStorage.removeItem('subhakamana_school_data')`
3. Refresh the page
4. Default credentials will be restored

### Data Not Saving
1. Check browser console for errors
2. Ensure localStorage is not disabled
3. Check available storage space
4. Try clearing cache and reloading

### Applications Not Appearing
1. Verify the form was submitted successfully (check console logs)
2. Refresh the Applications Manager page
3. Check the "All" filter is selected
4. Verify localStorage contains the data

## 📞 Support

For issues or questions:
- Check browser console for error messages
- Verify localStorage is enabled in your browser
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

---

**Note:** This setup is perfect for development, testing, and small-scale deployments. For production use with multiple admins or high traffic, consider implementing a backend database.
