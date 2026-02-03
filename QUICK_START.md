# 🚀 Quick Start Guide

## Start the Application

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🔐 Access Admin Panel

**URL:** `http://localhost:5173/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

---

## ✨ What You Can Do

### 1. Update Website Content
- Go to **Pages** → Edit Home, About, or Admissions pages
- Changes appear **immediately** on the website

### 2. Manage Notices
- Go to **Notices** → Add/Edit/Delete notices
- Set a notice as "Latest" to feature it

### 3. Manage Blog Posts
- Go to **Blog Posts** → Create/Edit/Delete posts
- Toggle publish/unpublish status

### 4. Manage Gallery
- Go to **Gallery** → Add/Edit/Delete images
- Organize by categories

### 5. View Applications
- Go to **Applications** → See all admission form submissions
- Contact applicants directly

### 6. Update Settings
- Go to **Settings** → Update school info, social links
- Change admin credentials
- **Export/Import data backups**

---

## 💾 Important: Backup Your Data

1. Login to admin panel
2. Go to **Settings**
3. Scroll to **Data Backup & Restore**
4. Click **Export Data (Backup)**
5. Save the JSON file safely

**Do this regularly!** Your data is stored in browser localStorage and will be lost if you clear browser data.

---

## 🔄 Restore from Backup

1. Go to **Settings** → **Data Backup & Restore**
2. Click **Import Data (Restore)**
3. Select your backup JSON file
4. Confirm the import

---

## 🎯 Test the Admission Form

1. Visit the public website: `http://localhost:5173`
2. Click **Apply Now** button
3. Fill out the admission form
4. Submit
5. Login to admin panel
6. Go to **Applications** to see the submission

---

## ⚠️ Forgot Admin Password?

Open browser console (F12) and run:

```javascript
localStorage.removeItem('subhakamana_school_data')
```

Then refresh the page. Default credentials will be restored.

---

## 📱 How It Works

- All data is stored in your browser's localStorage
- No database or backend required
- Changes are saved automatically
- Data persists across browser sessions
- Each browser has independent data

---

## ✅ Quick Checklist

- [ ] Start the dev server
- [ ] Login to admin panel
- [ ] Change admin password
- [ ] Update school information
- [ ] Edit a page (Home/About/Admissions)
- [ ] Create a notice
- [ ] Create a blog post
- [ ] Add a gallery image
- [ ] Test admission form submission
- [ ] Create a data backup
- [ ] View the public website

---

## 🆘 Need Help?

Check these files:
- `ADMIN_GUIDE.md` - Detailed admin panel documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical details of changes made

---

**That's it! Your admin panel is ready to use. No database setup required!** 🎉
