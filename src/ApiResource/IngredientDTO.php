<?php
namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\GetIngredientByRecipe;
use App\Entity\Ingredient;
use Symfony\Component\ObjectMapper\Attribute\Map;

#[ApiResource(
    shortName:'ingredient',
    stateOptions: new Options(entityClass: Ingredient::class),
    operations: [
        
    ]
)]
#[Map(Ingredient::class)]
final class IngredientDTO {
   
    public ?int $id;
    public string $label;

    public string $unit;

    public int $quantity;
}