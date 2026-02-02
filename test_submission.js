
import { Builder, By, until } from 'selenium-webdriver';

(async function testSubmission() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Navigating to home page...");
        await driver.get('http://localhost:5173');

        // Locate and click "Apply Now" button
        console.log("Looking for 'Apply Now' button...");
        // Wait for the button to be visible. It might be in the top bar or nav.
        // Based on Header.jsx, there is one in .desktop-menu
        let applyButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Apply Now')]")), 10000);
        await applyButton.click();
        console.log("Clicked 'Apply Now'.");

        // Wait for Admission Form Modal
        let modal = await driver.wait(until.elementLocated(By.className('admission-form-modal')), 5000);
        console.log("Admission Form Modal appeared.");

        // Fill out the form
        console.log("Filling out form...");
        await driver.findElement(By.name('studentName')).sendKeys('Test Student');
        await driver.findElement(By.name('dateOfBirth')).sendKeys('2015-01-01');
        await driver.findElement(By.name('grade')).sendKeys('Grade 5'); // Select dropdown
        await driver.findElement(By.name('parentName')).sendKeys('Test Parent');
        await driver.findElement(By.name('email')).sendKeys('testparent@example.com');
        await driver.findElement(By.name('phone')).sendKeys('+977-9800000000');
        await driver.findElement(By.name('address')).sendKeys('Kathmandu, Nepal');
        await driver.findElement(By.name('message')).sendKeys('This is a test application from selenium.');

        // Submit
        console.log("Submitting form...");
        let submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();

        // Wait for success message
        console.log("Waiting for success message...");
        await driver.wait(until.elementLocated(By.className('success-message')), 5000);
        console.log("Success message verified!");

        // --- CHECK ADMIN PANEL ---
        console.log("Navigating to Admin Panel...");
        await driver.get('http://localhost:5173/admin');

        // Handle Login if redirected
        // Check if we are on login page
        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('login')) {
            console.log("Logging in...");
            await driver.findElement(By.name('username')).sendKeys('admin'); // Assuming name attributes
            await driver.findElement(By.name('password')).sendKeys('admin123');
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.wait(until.urlContains('admin'), 5000);
        }

        // Check for Applications
        console.log("Checking for applications...");
        // Wait for "Test Student" to appear
        try {
            let studentElement = await driver.wait(until.elementLocated(By.xpath("//h3[contains(text(), 'Test Student')]")), 5000);
            console.log("Found application for 'Test Student'!");
        } catch (e) {
            console.error("FAILED to find application in Admin Panel.");
            // Check debug info if present
            try {
                let debugInfo = await driver.findElement(By.xpath("//div[contains(text(), 'Debug Info')]"));
                console.log("Debug Info Content:", await debugInfo.getText());
            } catch (x) {
                console.log("No Debug Block found (maybe list is not empty, but student not found?)");
            }
            // Take screenshot or page source
            let pageSource = await driver.getPageSource();
            // console.log(pageSource); // Too verbose
        }

    } catch (e) {
        console.error("Test Error:", e);
    } finally {
        await driver.quit();
    }
})();
