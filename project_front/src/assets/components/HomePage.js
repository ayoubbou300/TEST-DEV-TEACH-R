import React, { useState } from "react";
import Button from "./Button";

const HomePage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Page d'Accueil</h1>

      <div className="space-x-4">
        <Button type="primary" onClick={() => setShowCategories(true)}>
          Gérer les Catégories
        </Button>
        <Button type="secondary" onClick={() => setShowProducts(true)}>
          Gérer les Produits
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
