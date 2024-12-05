<?php

namespace App\Entity;

use App\Repository\ProduitRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitRepository::class)]
class Produit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['produit:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le nom du produit est obligatoire.")]
    #[Assert\Length(
        max: 255,
        maxMessage: "tu as atteint la limite des caractères."
    )]
    #[Groups(['produit:read', 'categorie:read'])]
    private ?string $nom = null;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "La description du produit est obligatoire.")]
    #[Groups(['produit:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Assert\NotBlank(message: "Le prix du produit est obligatoire.")]
    #[Assert\Positive(message: "Le prix doit être un nombre positif.")]
    #[Groups(['produit:read'])]
    private ?float $prix = null;

    #[ORM\Column]
    #[Assert\NotNull(message: "La Date est obligatoire.")]
    #[Groups(['produit:read'])]
    private ?\DateTimeImmutable $dateCreation = null;

    #[ORM\ManyToOne(targetEntity: Categorie::class, inversedBy: 'produits')]    
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull(message: "La catégorie est obligatoire.")]
    #[Groups(['produit:read', 'categorie:read'])]
    private ?Categorie $categorie = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeImmutable
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeImmutable $dateCreation): static
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }
}
