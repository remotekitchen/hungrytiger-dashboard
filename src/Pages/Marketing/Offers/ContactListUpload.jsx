import Papa from "papaparse";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ContactListUpload = ({ emails, setEmails }) => {
  const [dragActive, setDragActive] = useState(false);

  const extractEmailsFromData = (data, emailColumnIndex) => {
    // Function to extract emails from the data based on the email column index
    return data
      .map((row) => {
        const email = row[emailColumnIndex];
        return email?.trim();
      })
      .filter(Boolean); // Filter out empty or undefined values
  };

  const findEmailColumnIndex = (rows) => {
    // Search through the first few rows to find the "Email" column index
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const emailColumnIndex = row.findIndex(
        (col) => col?.toLowerCase() === "email"
      );
      if (emailColumnIndex !== -1) {
        return { emailColumnIndex, headerRowIndex: i };
      }
    }
    return { emailColumnIndex: -1, headerRowIndex: -1 };
  };

  const handleCSVFile = (file) => {
    Papa.parse(file, {
      header: false, // We will manually handle the header row
      skipEmptyLines: true,
      complete: (results) => {
        // console.log("Parsed CSV data: ", results.data); // Debugging CSV data

        // Find the index of the column that contains the "Email" field
        const { emailColumnIndex, headerRowIndex } = findEmailColumnIndex(
          results.data
        );

        if (emailColumnIndex === -1) {
          alert("No email column found in the CSV file.");
          return;
        }

        // Extract emails from the data, starting from the row after the header row
        const extractedEmails = extractEmailsFromData(
          results.data.slice(headerRowIndex + 1),
          emailColumnIndex
        );
        const uniqueEmails = [...new Set(extractedEmails)];
        setEmails(uniqueEmails);
      },
      error: (error) => {
        console.error("Error parsing CSV: ", error); // Handle errors
      },
    });
  };

  const handleExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // console.log("Parsed Excel data: ", jsonData); // Debugging Excel data

      // Find the index of the column that contains the "Email" field
      const { emailColumnIndex, headerRowIndex } =
        findEmailColumnIndex(jsonData);

      if (emailColumnIndex === -1) {
        alert("No email column found in the Excel file.");
        return;
      }

      // Extract emails from the data, starting from the row after the header row
      const extractedEmails = extractEmailsFromData(
        jsonData.slice(headerRowIndex + 1),
        emailColumnIndex
      );
      const uniqueEmails = [...new Set(extractedEmails)];
      setEmails(uniqueEmails);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension === "csv") {
        // Handle CSV file
        handleCSVFile(file);
      } else if (fileExtension === "xlsx") {
        // Handle Excel file
        handleExcelFile(file);
      } else {
        alert("Please upload a valid CSV or Excel file.");
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div className="p-4">
      <label
        htmlFor="fileInput"
        className={`border-2 border-dashed border-gray-300 w-full h-32 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-gray-400 transition ${
          dragActive ? "border-blue-500 bg-blue-50" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16V8a4 4 0 014-4h2a4 4 0 014 4v8m5 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V8a4 4 0 00-4-4H6a4 4 0 00-4 4v8"
          />
        </svg>
        <p className="mt-2 text-gray-600">
          Drop your file here or{" "}
          <span className="text-blue-500 font-semibold">Browse files</span>
        </p>
        <p className="text-xs text-gray-500">
          Only CSV and XLSX file formats are supported
        </p>
      </label>
      <input
        id="fileInput"
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ContactListUpload;
