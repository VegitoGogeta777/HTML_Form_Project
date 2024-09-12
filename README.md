Title: HTML_Form_Project

Description: It is a Project that is done in both HTML and JavaScript. It is a Form where the entered details are stored in the "JsonPowerDB" Database. A peculiar feature about this project is the buttons used in the form. The form has 3 buttons namely 'save' , 'change' and 'reset' and is disabled by default. When a new record is being added, the 'save' and 'reset' button will be enabled and if a record is already present (based on 'full-name'), the 'change' and 'reset' button will be enabled.

Benefits of using JsonPowerDB: Using JsonPowerDB (JPDB) in the above project offers several advantages, including its schema-free nature, which allows flexibility in storing student data without predefined structures. The built-in REST APIs simplify database interactions, making it easy to connect your frontend directly to the database with minimal code. This enables quick operations like inserting, updating, or retrieving student records in real-time with high performance.

Additionally, JPDB provides primary key support, ensuring unique identification of records, and works seamlessly with JSON, reducing the need for data transformation. Its low setup requirements, security through connection tokens, and scalability make it an ideal choice for lightweight applications, offering both speed and convenience for real-time data management.

Release History :
---

### [v1.0.0] - 2024-09-11
- **Initial Release**
  - Implemented the core functionality for managing student records using JsonPowerDB.
  - Added HTML form for student data input including Roll-No, Full-Name, Class, Birth-Date, Address, and Enrollment-Date.
  - Developed JavaScript functions to interact with JsonPowerDB via RESTful APIs.
  - Implemented buttons for **Save**, **Change**, and **Reset** actions with dynamic enabling/disabling based on record existence.
  - Integrated JsonPowerDB’s base URL and API endpoints for handling database operations.
  - Added functionality to enable the **Save** button for new records and the **Change** button for existing records.

### [v1.1.0] - 2024-09-11
- **Bug Fixes and Enhancements**
  - Corrected issue with button states not updating correctly for existing records.
  - Improved validation and error handling in JavaScript code.
  - Updated documentation to include new features and fixes.

### [v1.2.0] - 2024-09-12
- **UI and Performance Improvements**
  - Moved **Full-Name** input field below **Roll-No** in HTML form for better user experience.
  - Enhanced performance of data retrieval and update operations.
  - Added logging for API responses to facilitate debugging.

---

Completion Time: 2 days

Project Status: Completed

[Note: The full-name should be entered exactly as registored in the database to change (update) contents]
