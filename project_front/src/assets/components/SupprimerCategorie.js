import React from "react";
import axios from "axios";

const SupprimerCategorie = ({ categorieId, refreshCategories, onClose }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://example.com/api/categories/${categorieId}`);
      refreshCategories();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie", error);
    }
  };

  return (
    <div className="confirmation-container">
      <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
      <button onClick={handleDelete} className="btn-delete">
        Supprimer
      </button>
      <button onClick={onClose} className="btn-close">
        Annuler
      </button>
    </div>
  );
};

export default SupprimerCategorie;
