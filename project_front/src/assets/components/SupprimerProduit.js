import React from "react";
import axios from "axios";

const SupprimerProduit = ({ produitId, refreshProduits, onClose }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://example.com/api/produits/${produitId}`);
      refreshProduits();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  return (
    <div className="confirmation-container">
      <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
      <button onClick={handleDelete} className="btn-delete">
        Supprimer
      </button>
      <button onClick={onClose} className="btn-close">
        Annuler
      </button>
    </div>
  );
};

export default SupprimerProduit;
