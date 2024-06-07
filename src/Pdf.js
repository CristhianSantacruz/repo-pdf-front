import React, { useState } from 'react';

function App() {
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleGeneratePdf = async () => {
    const response = await fetch('http://localhost:7070/api/v1/pdf/products/generate-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          codigo: 1,
          nombre: "Producto 1",
          descripcion: "Descripción 1",
          img: "img1.jpg",
          categoria: "Categoría 1",
          subCategoria: ["Sub 1", "Sub 2"],
          marca: "Marca 1",
          precio: 100.0,
          cant: 10,
          borrado: false
        },
        {
          codigo: 2,
          nombre: "Producto 2",
          descripcion: "Descripción 2",
          img: "img2.jpg",
          categoria: "Categoría 2",
          subCategoria: ["Sub 3", "Sub 4"],
          marca: "Marca 2",
          precio: 200.0,
          cant: 20,
          borrado: false
        }
      ]),
    });

    if (response.ok) {
      const data = await response.json();
      setDownloadUrl(data.url);
    } else {
      console.error('Failed to generate PDF');
    }
  };

  return (
    <div className="App">
      <h1>Generate and Download PDF</h1>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      {downloadUrl && (
        <div>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
