import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [nomCategorie, setNomCategorie] = useState('');
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    chargerCategories();
  }, []);

  // Charger les catégories depuis l'API
  const chargerCategories = async () => {
    setChargement(true);
    try {
      const response = await axios.get("https://example.com/api/categories");
      setCategories(response.data);
      setErreur(null);
    } catch (error) {
      setErreur("Erreur lors du chargement des catégories");
    } finally {
      setChargement(false);
    }
  };

  // Ajouter une catégorie
  const ajouterCategorie = async () => {
    if (!nomCategorie) return;
    try {
      const response = await axios.post("https://example.com/api/categories", {
        nom: nomCategorie,
      });
      setCategories([...categories, response.data]);
      setNomCategorie('');
    } catch (error) {
      setErreur("Erreur lors de l'ajout de la catégorie");
    }
  };

  // Supprimer une catégorie
  const supprimerCategorie = async (id) => {
    try {
      await axios.delete(`https://example.com/api/categories/${id}`);
      setCategories(categories.filter(categorie => categorie.id !== id));
    } catch (error) {
      setErreur("Erreur lors de la suppression de la catégorie");
    }
  };

  if (chargement) return <p>Chargement...</p>;
  if (erreur) return <p>{erreur}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Catégories</h1>

      <div className="mb-4">
        <input
          type="text"
          value={nomCategorie}
          onChange={(e) => setNomCategorie(e.target.value)}
          placeholder="Nom de la catégorie"
          className="border px-4 py-2"
        />
        <button
          onClick={ajouterCategorie}
          className="bg-blue-500 text-white px-6 py-2 ml-4 rounded hover:bg-blue-600"
        >
          Ajouter Catégorie
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categorie) => (
            <tr key={categorie.id}>
              <td className="border border-gray-300 px-4 py-2">{categorie.id}</td>
              <td className="border border-gray-300 px-4 py-2">{categorie.nom}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => supprimerCategorie(categorie.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
