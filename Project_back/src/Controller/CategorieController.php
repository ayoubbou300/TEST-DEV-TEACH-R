<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/categories', name: 'api_categories_')]
class CategorieController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(CategorieRepository $categorieRepository): Response
    {
        return $this->json($categorieRepository->findAll(), 200, [], ['groups' => 'categorie:read']);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);
        $categorie = new Categorie();
        $categorie->setNom($data['nom']);
        $errors = $validator->validate($categorie);
        if (count($errors) > 0) {
            return $this->json($errors);
        }
        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json($categorie, 201);
    }

    


    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Categorie $categorie): Response
    {
        return $this->json($categorie, 200, [], ['groups' => 'categorie:read']);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request,ValidatorInterface $validator, Categorie $categorie, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $errors = $validator->validate($categorie);
        if (count($errors) > 0) {
            return $this->json($errors);
        }
        $categorie->setNom($data['nom'] ?? $categorie->getNom());
        $entityManager->flush();

        return $this->json($categorie);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Categorie $categorie, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($categorie);
        $entityManager->flush();

        return $this->json(['message' => 'Catégorie supprimée avec succès.'], 204);
    }
}
