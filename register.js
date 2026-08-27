/* =========================================
   Sanaullah School
   Student Registration JavaScript
   ========================================= */


// Google Apps Script Web App URL
const SCRIPT_URL =
    "https://script.google.com/macros/library/d/18SAxL9A0FfQIGwCCl8E2T_CJBjaZu5-WGDjL4q_vmQsmHs7z87HauakF/2";


// Get HTML elements
const registrationForm =
    document.getElementById("registrationForm");

const registerButton =
    document.getElementById("registerButton");

const loadingMessage =
    document.getElementById("loadingMessage");

const successMessage =
    document.getElementById("successMessage");

const successText =
    document.getElementById("successText");

const studentIdElement =
    document.getElementById("studentId");

const errorMessage =
    document.getElementById("errorMessage");


// =========================================
// Registration Form Submit
// =========================================

registrationForm.addEventListener("submit", async function (event) {

    // Page reload روکیں
    event.preventDefault();

    // پہلے پرانے messages چھپائیں
    successMessage.hidden = true;
    errorMessage.hidden = true;

    // Form values حاصل کریں
    const studentName =
        document.getElementById("studentName").value.trim();

    const studentClass =
        document.getElementById("studentClass").value.trim();

    const language =
        document.getElementById("language").value.trim();

    const email =
        document.getElementById("email").value.trim();


    // =========================================
    // Basic Validation
    // =========================================

    if (!studentName) {

        showError("براہ کرم طالب علم کا نام لکھیں۔");

        return;
    }


    if (!studentClass) {

        showError("براہ کرم اپنی کلاس منتخب کریں۔");

        return;
    }


    if (!language) {

        showError("براہ کرم اپنی زبان منتخب کریں۔");

        return;
    }


    // =========================================
    // Button & Loading State
    // =========================================

    registerButton.disabled = true;

    registerButton.textContent =
        "Registration ہو رہی ہے...";

    loadingMessage.hidden = false;


    // Data object
    const studentData = {

        studentName: studentName,

        studentClass: studentClass,

        language: language,

        email: email

    };


    // =========================================
    // Send Data to Google Apps Script
    // =========================================

    try {

        const response = await fetch(
            SCRIPT_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(studentData)
            }
        );


        // Response کو JSON میں تبدیل کریں
        const result = await response.json();


        // Loading ختم کریں
        loadingMessage.hidden = true;


        // =========================================
        // Successful Registration
        // =========================================

        if (result.success) {

            studentIdElement.textContent =
                result.studentId || "-";

            successText.textContent =
                "آپ کی registration کامیابی سے مکمل ہوگئی۔";

            successMessage.hidden = false;

            // Form صاف کریں
            registrationForm.reset();

            // Success message تک scroll
            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            showError(
                result.message ||
                "Registration مکمل نہیں ہو سکی۔"
            );
        }


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        loadingMessage.hidden = true;

        showError(
            "Internet یا server connection میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔"
        );

    } finally {

        registerButton.disabled = false;

        registerButton.textContent =
            "رجسٹر کریں";
    }

});


// =========================================
// Show Error Message
// =========================================

function showError(message) {

    errorMessage.textContent =
        "❌ " + message;

    errorMessage.hidden = false;

    errorMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
