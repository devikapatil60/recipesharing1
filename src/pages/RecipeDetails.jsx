import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const foundRecipe = allRecipes.find((r) => r.id.toString() === id);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) return <h2 style={{ textAlign: "center", color: "red" }}>Recipe Not Found</h2>;

  // ✅ Function to Download Recipe as PDF
  const downloadPDF = () => {
    const input = document.getElementById("recipe-card");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // ✅ Add Website Name at the Top
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text("TasteHub", 105, 15, { align: "center" });

      // ✅ Add Recipe Image
      pdf.addImage(imgData, "PNG", 10, 25, 190, 0);

      // ✅ Save PDF with Recipe Name
      pdf.save(`${recipe.title}.pdf`);
    });
  };

  return (
    <div id="recipe-card" style={styles.container}>
      <h2 style={styles.title}>{recipe.title}</h2>
      <img src={recipe.image || "/default-image.jpg"} alt={recipe.title} style={styles.image} />
      <p style={styles.description}><strong>Description:</strong> {recipe.description}</p>
      <p style={styles.details}><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p style={styles.details}><strong>Instructions:</strong> {recipe.instructions}</p>
      <p style={styles.details}><strong>Posted by:</strong> {recipe.userEmail}</p>

      {/* 📜 PDF Download Button */}
      <button onClick={downloadPDF} style={styles.pdfButton}>Download as PDF</button>
    </div>
  );
};

// ✅ Inline CSS Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    color: "#666",
  },
  details: {
    fontSize: "14px",
    color: "#888",
  },
  pdfButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default RecipeDetails;
