<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Entity\Categorie;
use App\Repository\ProduitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/produits', name: 'api_produits_')]
class ProduitController extends AbstractController
{
    #[Route('', name: 'index', methods: ['GET'])]
    public function index(ProduitRepository $produitRepository, SerializerInterface $serializer): JsonResponse
    {
        $produits = $produitRepository->findAll();

        $data = $serializer->serialize($produits, 'json', ['groups' => ['produit:read', 'categorie:read']]);

        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit = new Produit();
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);
        $produit->setDateCreation(new \DateTimeImmutable());

        $errors = $validator->validate($produit);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        if (isset($data['categorie_id'])) {
            $categorie = $entityManager->getRepository(Categorie::class)->find($data['categorie_id']);
            if (!$categorie) {
                return $this->json(['error' => 'Categorie non trouvée.'], 404);
            }
            $produit->setCategorie($categorie);
        }

        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json($produit, 201, [], ['groups' => 'produit:read']);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Produit $produit,  SerializerInterface $serializer): Response
    {
        $data = $serializer->serialize($produit, 'json', ['groups' => ['produit:read', 'categorie:read']]);
        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Produit $produit, ValidatorInterface $validator, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $produit->setNom($data['nom'] ?? $produit->getNom());
        $produit->setDescription($data['description'] ?? $produit->getDescription());
        $produit->setPrix($data['prix'] ?? $produit->getPrix());
        
        $errors = $validator->validate($produit);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }

        if (isset($data['categorie_id'])) {
            $categorie = $entityManager->getRepository(Categorie::class)->find($data['categorie_id']);
            if (!$categorie) {
                return $this->json(['error' => 'Categorie non trouvée.'], 404);
            }
            $produit->setCategorie($categorie);
        }

        $entityManager->flush();

        return $this->json($produit, 200, [], ['groups' => 'produit:read']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Produit $produit, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($produit);
        $entityManager->flush();

        return $this->json(['message' => 'Produit supprimé avec succès.'], 204);
    }
}
