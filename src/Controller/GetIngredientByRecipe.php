<?php

namespace App\Controller;

use App\ApiResource\IngredientDTO;
use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\ObjectMapper\ObjectMapper;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;

#[AsController]
class GetIngredientByRecipe extends AbstractController {

    public function __construct(private ObjectMapperInterface $mapper) {
        
    }
    public function __invoke(Recipe $recipe) {
        
        return $this->json(array_map(fn($item) => $this->mapper->map($item, IngredientDTO::class),$recipe->getIngredients()->toArray()));
    }
}
