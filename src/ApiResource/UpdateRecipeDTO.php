<?php
namespace App\ApiResource;

use App\Entity\Recipe;
use App\Mapper\DtoCollection;
use Symfony\Component\ObjectMapper\Attribute\Map;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Positive;

#[Map(target: Recipe::class)]
class UpdateRecipeDTO {
    
    #[NotBlank]
    public string $title;
    #[NotBlank]
    public string $category;
    #[NotBlank]
    public string $steps;
    public ?string $picture = null;

    #[NotBlank]
    #[Positive]
    public int $servings;
    
    
    #[Map(transform:DtoCollection::class)]
    /**
     * @var IngredientDTO[]
     */
    public array $ingredients = [];
}