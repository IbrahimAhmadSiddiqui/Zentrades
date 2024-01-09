"use client";
import { sortProducts } from "@/utils/modify-data";
import React, { useState } from "react";

// Define the ProductTable component
const ProductTable = () => {
  // Initialize state variables
  const [products, setProducts] = useState<Products>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [deselectColumns, setDeselectColumns] = useState<string[]>([]);

  // Handle file change event
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Check if there are any files selected
    if (event.target.files && event.target.files.length > 0) {
      // Get the selected file
      const file = event.target.files[0];

      try {
        // Read the file content
        const content = await file.text();

        // Parse the JSON content
        const data = JSON.parse(content) as IResponse;

        // Set the products state with the parsed data
        setProducts(sortProducts(data.products));

        // Set the selected columns with the keys of the first product in the products object
        setSelectedColumns(
          Object.keys(data.products[Object.keys(data.products)[0]])
        );
      } catch (error) {
        // Log the error
        console.error("Error parsing JSON file", error);
      }
    }
  };

  // Handle column toggle event
  const handleColumnToggle = (column: string) => {
    // Update the selected columns by adding or removing the specified column
    setSelectedColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };

  // Handle deselect column toggle event
  const handleDeselectColumnToggle = (column: string) => {
    // Update the deselect columns by adding or removing the specified column
    setDeselectColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };

  // Handle move to select event
  const moveToSelect = () => {
    // Clear the deselect columns
    setDeselectColumns([]);

    // Add the deselect columns to the selected columns
    setSelectedColumns([...selectedColumns, ...deselectColumns]);
  };

  // Handle move to deselect event
  const moveToDeselect = () => {
    // Clear the selected columns
    setSelectedColumns([]);

    // Add the selected columns to the deselect columns
    setDeselectColumns([...selectedColumns, ...deselectColumns]);
  };
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // Render the ProductTable component
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-medium text-center my-10">
        2. Create an application to parse the JSON from the API mentioned below.
      </h2>
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept=".json,application/json"
        onChange={handleFileChange}
      />
      <button
        onClick={() => ref.current.click()}
        className="bg-blue-700 rounded-md w-full py-2 cursor-pointer"
      >
        Upload
      </button>
      <div className="flex justify-between mt-4 gap-4">
        <div className="flex flex-col gap-1">
          {Object.keys(
            products && Object.keys(products)[0]
              ? products[Object.keys(products)[0]]
              : {}
          ).map((column) => (
            <label key={column} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedColumns.includes(column)}
                onChange={() => handleColumnToggle(column)}
                className="mr-2"
              />
              {column}
            </label>
          ))}
        </div>
        {products && (
          <div className="flex flex-col gap-2">
            <button
              onClick={moveToSelect}
              className="btn bg-blue-700 rounded text-xs p-4 cursor-pointer btn-primary"
            >
              {"<<"}
            </button>
            <button
              onClick={moveToDeselect}
              className="btn bg-blue-700 rounded text-xs p-4 cursor-pointer btn-primary"
            >
              {">>"}
            </button>
          </div>
        )}
        <div className="flex flex-col gap-1">
          {Object.keys(
            products && Object.keys(products)[0]
              ? products[Object.keys(products)[0]]
              : {}
          ).map((column) => (
            <label key={column} className="flex items-center">
              <input
                type="checkbox"
                checked={deselectColumns.includes(column)}
                onChange={() => handleDeselectColumnToggle(column)}
                className="mr-2"
              />
              {column}
            </label>
          ))}
        </div>
      </div>
      <table className="mt-4 p-4 border w-full">
        <thead className="border">
          <tr className="border">
            {selectedColumns.map((column) => (
              <th className="border p-2" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border">
          {Object.values(products).map((product, index) => (
            <tr className="border" key={index}>
              {selectedColumns.map((column) => (
                <td className="border p-2" key={column}>
                  {product[column as keyof Product]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
