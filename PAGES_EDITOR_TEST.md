# Pages Editor Testing Guide

## ✅ How to Test Pages Editor

### Test 1: Home Page Content Update

1. **Login to Admin Panel**
   - Go to `http://localhost:5173/admin`
   - Login with: `admin` / `admin123`

2. **Navigate to Pages Editor**
   - Click **Pages** in the sidebar

3. **Edit Home Page**
   - Ensure **Home** tab is selected
   - Change **Hero Title** to: "Test School Name"
   - Change **Hero Subtitle** to: "Testing Updates"
   - Change **Hero Description** to: "This is a test description to verify updates work."
   - Click **Save Changes**
   - Wait for "✓ Changes saved!" message

4. **Verify on Website**
   - Open new tab: `http://localhost:5173`
   - Check hero section shows your new text
   - ✅ If text updated = WORKING!

---

### Test 2: About Page Content Update

1. **Switch to About Tab**
   - Click **About** button in Pages Editor

2. **Edit Mission**
   - Change **Mission Title** to: "Our Test Mission"
   - Change **Mission Description** to: "Testing mission description updates."
   - Click **Save Changes**

3. **Edit Principal Info**
   - Change **Principal Name** to: "Test Principal"
   - Change **Principal Message** to: "This is a test message."
   - Click **Save Changes**

4. **Verify on Website**
   - Go to: `http://localhost:5173/about`
   - Check Mission section shows new text
   - Check Principal section shows new name and message
   - ✅ If updated = WORKING!

---

### Test 3: Admissions Page Content Update

1. **Switch to Admissions Tab**
   - Click **Admissions** button in Pages Editor

2. **Edit Introduction**
   - Change **Title** to: "Test Admissions Title"
   - Change **Description** to: "Testing admissions description."
   - Click **Save Changes**

3. **Edit Fees**
   - Change **Admission Fee** to: "NPR 20,000"
   - Change **Annual Fee** to: "NPR 30,000"
   - Change **Monthly Fee** to: "NPR 6,000"
   - Click **Save Changes**

4. **Verify on Website**
   - Go to: `http://localhost:5173/admissions`
   - Check intro section shows new title and description
   - Check fees section shows new amounts
   - ✅ If updated = WORKING!

---

### Test 4: Array Editor (Services, Programs, etc.)

1. **Go to Home Tab**
   - Click **Home** button

2. **Edit Services**
   - Scroll to **Services** section
   - Click on first service to expand
   - Change **Title** to: "Test Service"
   - Change **Description** to: "Testing service updates"
   - Click outside to collapse
   - Click **Save Changes**

3. **Add New Service**
   - Click **Add Item** in Services section
   - Fill in:
     - Title: "New Test Service"
     - Description: "This is a new service"
     - Icon: "FiStar"
   - Click **Save Changes**

4. **Delete a Service**
   - Click trash icon on any service
   - Click **Save Changes**

5. **Verify on Website**
   - Go to: `http://localhost:5173`
   - Scroll to services section
   - Check your changes appear
   - ✅ If updated = WORKING!

---

### Test 5: Data Persistence

1. **Make Changes**
   - Edit any content in Pages Editor
   - Click **Save Changes**

2. **Refresh Admin Panel**
   - Press F5 or Ctrl+R
   - Navigate back to Pages Editor
   - Check if your changes are still there
   - ✅ If persisted = WORKING!

3. **Close and Reopen Browser**
   - Close browser completely
   - Reopen and go to admin panel
   - Check Pages Editor
   - ✅ If changes still there = WORKING!

---

### Test 6: Tab Switching

1. **Edit Home Page**
   - Make a change to Hero Title
   - Click **Save Changes**

2. **Switch to About Tab**
   - Click **About** button
   - Make a change to Mission Title
   - Click **Save Changes**

3. **Switch Back to Home Tab**
   - Click **Home** button
   - Verify your previous change is still there
   - ✅ If both changes saved = WORKING!

---

### Test 7: Real-time Website Updates

1. **Open Two Browser Windows**
   - Window 1: Admin Panel Pages Editor
   - Window 2: Public Website

2. **Make Changes in Admin**
   - Edit Hero Title in admin panel
   - Click **Save Changes**

3. **Refresh Public Website**
   - Press F5 on Window 2
   - Check if changes appear
   - ✅ If updated = WORKING!

---

## 🐛 Troubleshooting

### Changes Not Saving
- Check browser console (F12) for errors
- Verify "✓ Changes saved!" message appears
- Check localStorage in DevTools → Application → Local Storage

### Changes Not Appearing on Website
- Hard refresh the page (Ctrl+Shift+R)
- Clear browser cache
- Check if you're looking at the correct page

### Lost Changes After Refresh
- Check if localStorage is enabled
- Check browser storage quota
- Verify no errors in console

---

## ✅ Expected Results

After all tests, you should be able to:

- [x] Edit Home page content (hero, services, programs, testimonials, stats)
- [x] Edit About page content (mission, vision, principal, team)
- [x] Edit Admissions page content (intro, fees)
- [x] Add/Edit/Delete array items (services, programs, etc.)
- [x] Save changes successfully
- [x] See changes persist after refresh
- [x] See changes appear on public website
- [x] Switch between tabs without losing data

---

## 📊 Test Results Template

```
Test 1 - Home Page Update: ✅ PASS / ❌ FAIL
Test 2 - About Page Update: ✅ PASS / ❌ FAIL
Test 3 - Admissions Page Update: ✅ PASS / ❌ FAIL
Test 4 - Array Editor: ✅ PASS / ❌ FAIL
Test 5 - Data Persistence: ✅ PASS / ❌ FAIL
Test 6 - Tab Switching: ✅ PASS / ❌ FAIL
Test 7 - Real-time Updates: ✅ PASS / ❌ FAIL

Overall Status: ✅ ALL TESTS PASSED / ❌ SOME TESTS FAILED
```

---

## 🎯 Quick Verification

**Fastest way to verify everything works:**

1. Login to admin panel
2. Go to Pages → Home tab
3. Change Hero Title to "TEST"
4. Click Save Changes
5. Open `http://localhost:5173` in new tab
6. If hero shows "TEST" → ✅ **EVERYTHING WORKS!**

---

## 📝 Notes

- All changes are saved to localStorage automatically
- Changes appear immediately after save
- No page refresh needed in admin panel
- Public website needs refresh to see changes
- Data persists across browser sessions
- Each browser has independent data storage

---

**Status:** Ready for testing! 🚀
