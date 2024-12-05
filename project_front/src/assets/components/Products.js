import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nomProduit, setNomProduit] = useState('');
  const [descriptionProduit, setDescriptionProduit] = useState('');
  const [prixProduit, setPrixProduit] = useState('');
  const [categorieProduit, setCategorieProduit] = useState('');
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    chargerProduits();
    chargerCategories();
  }, []);

  // Charger les produits depuis l'API
  const chargerProduits = async () => {
    setChargement(true);
    try {
      const response = await axios.get("https://example.com/api/produits");
      setProduits(response.data);
      setErreur(null);
    } catch (error) {
      setErreur("Erreur lors du chargement des produits");
    } finally {
      setChargement(false);
    }
  };

  // Charger les catégories depuis l'API
  const chargerCategories = async () => {
    try {
      const response = await axios.get("https://example.com/api/categories");
      setCategories(response.data);
    } catch (error) {
      setErreur("Erreur lors du chargement des catégories");
    }
  };

  // Ajouter un produit
  const ajouterProduit = async () => {
    if (!nomProduit || !prixProduit || !categorieProduit) return;
    try {
      const response = await axios.post("https://example.com/api/produits", {
        nom: nomProduit,
        description: descriptionProduit,
        prix: prixProduit,
        categorie: { id: categorieProduit },
      });
      setProduits([...produits, response.data]);
      setNomProduit('');
      setDescriptionProduit('');
      setPrixProduit('');
      setCategorieProduit('');
    } catch (error) {
      setErreur("Erreur lors de l'ajout du produit");
    }
  };

  // Supprimer un produit
  const supprimerProduit = async (id) => {
    try {
      await axios.delete(`https://example.com/api/produits/${id}`);
      setProduits(produits.filter(produit => produit.id !== id));
    } catch (error) {
      setErreur("Erreur lors de la suppression du produit");
    }
  };

  // Modifier un produit
  const modifierProduit = async (id, data) => {
    try {
      const response = await axios.put(`https://example.com/api/produits/${id}`, data);
      const updatedProduits = produits.map((produit) =>
        produit.id === id ? response.data : produit
      );
      setProduits(updatedProduits);
    } catch (error) {
      setErreur("Erreur lors de la modification du produit");
    }
  };

  if (chargement) return <p>Chargement...</p>;
  if (erreur) return <p>{erreur}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Produits</h1>

      <div className="mb-4">
        <input
          type="text"
          value={nomProduit}
          onChange={(e) => setNomProduit(e.target.value)}
          placeholder="Nom du produit"
          className="border px-4 py-2"
        />
        <input
          type="text"
          value={descriptionProduit}
          onChange={(e) => setDescriptionProduit(e.target.value)}
          placeholder="Description du produit"
          className="border px-4 py-2 ml-4"
        />
        <input
          type="number"
          value={prixProduit}
          onChange={(e) => setPrixProduit(e.target.value)}
          placeholder="Prix du produit"
          className="border px-4 py-2 ml-4"
        />
        <select
          value={categorieProduit}
          onChange={(e) => setCategorieProduit(e.target.value)}
          className="border px-4 py-2 ml-4"
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.nom}
            </option>
          ))}
        </select>
        <button
          onClick={ajouterProduit}
          className="bg-blue-500 text-white px-6 py-2 ml-4 rounded hover:bg-blue-600"
        >
          Ajouter Produit
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Prix</th>
            <th className="border border-gray-300 px-4 py-2">Catégorie</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td className="border border-gray-300 px-4 py-2">{produit.id}</td>
              <td className="border border-gray-300 px-4 py-2">{produit.nom}</td>
              <td className="border border-gray-300 px-4 py-2">{produit.prix} €</td>
              <td className="border border-gray-300 px-4 py-2">{produit.categorie.nom}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => supprimerProduit(produit.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Supprimer
                </button>
                <button onClick={() => modifierProduit(produit.id, { nom: "Nouveau Nom" })} className="bg-yellow-500 text-white px-4 py-2 rounded ml-2">
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
