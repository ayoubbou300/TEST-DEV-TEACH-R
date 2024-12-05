import React, { useState, useEffect } from "react";
import axios from "axios";

const FormulaireCategorie = ({ categorieModifie, onClose, refreshCategories }) => {
  const [nom, setNom] = useState(categorieModifie ? categorieModifie.nom : "");
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom) {
      setErreur("Le nom de la catégorie est requis");
      return;
    }

    try {
      if (categorieModifie) {
        await axios.put(`https://example.com/api/categories/${categorieModifie.id}`, { nom });
      } else {
        await axios.post("https://example.com/api/categories", { nom });
      }
      refreshCategories();
      onClose();
    } catch (error) {
      setErreur("Erreur lors de l'enregistrement de la catégorie");
    }
  };

  return (
    <div className="form-container">
      <h2>{categorieModifie ? "Modifier la Catégorie" : "Ajouter une Catégorie"}</h2>
      {erreur && <p className="error">{erreur}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn-submit">
          {categorieModifie ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
      <button onClick={onClose} className="btn-close">
        Fermer
      </button>
    </div>
  );
};

export default FormulaireCategorie;
