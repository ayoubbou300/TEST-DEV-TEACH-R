import React, { useState, useEffect } from "react";
import axios from "axios";

const FormulaireProduit = ({ produitModifie, onClose, refreshProduits }) => {
  const [nom, setNom] = useState(produitModifie ? produitModifie.nom : "");
  const [description, setDescription] = useState(produitModifie ? produitModifie.description : "");
  const [prix, setPrix] = useState(produitModifie ? produitModifie.prix : "");
  const [categorieId, setCategorieId] = useState(produitModifie ? produitModifie.categorie.id : "");
  const [categories, setCategories] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://example.com/api/categories");
        setCategories(response.data);
      } catch (error) {
        setErreur("Erreur de chargement des catégories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !description || !prix || !categorieId) {
      setErreur("Tous les champs doivent être remplis");
      return;
    }

    const produitData = {
      nom,
      description,
      prix: parseFloat(prix),
      categorie: { id: categorieId },
    };

    try {
      if (produitModifie) {
        await axios.put(`https://example.com/api/produits/${produitModifie.id}`, produitData);
      } else {
        await axios.post("https://example.com/api/produits", produitData);
      }
      refreshProduits();
      onClose();
    } catch (error) {
      setErreur("Erreur lors de l'enregistrement du produit");
    }
  };

  return (
    <div className="form-container">
      <h2>{produitModifie ? "Modifier le Produit" : "Ajouter un Produit"}</h2>
      {erreur && <p className="error">{erreur}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="input"
        />
        <select
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
          className="input"
        >
          <option value="">Choisir une catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.nom}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-submit">
          {produitModifie ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
      <button onClick={onClose} className="btn-close">
        Fermer
      </button>
    </div>
  );
};

export default FormulaireProduit;
