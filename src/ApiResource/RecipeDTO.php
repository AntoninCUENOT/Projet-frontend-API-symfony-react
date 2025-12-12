<?php
namespace App\ApiResource;

use ApiPlatform\Doctrine\Orm\State\Options;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\OpenApi\Model;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\GetIngredientByRecipe;
use App\Controller\UploadImage;

use App\Entity\Recipe;
use Symfony\Component\ObjectMapper\Attribute\Map;

#[ApiResource(
    shortName: 'recipe',
    stateOptions: new Options(entityClass: Recipe::class),
    operations: [
        new Get(),
        new GetCollection(
            output: ListRecipeDTO::class,
            paginationClientItemsPerPage: true,
            paginationMaximumItemsPerPage: 20,
            paginationItemsPerPage: 5
        ),
        new GetCollection(uriTemplate: '/recipes/{id}/ingredients', controller: GetIngredientByRecipe::class, paginationEnabled: false),
        new Post(
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            ),
            uriTemplate: '/recipes/{id}/image',
            controller: UploadImage::class,
            inputFormats: ['multipart' => ['multipart/form-data']]
        ),
        new Post(input: CreateRecipeDTO::class),
        new Delete(map:false),
        new Patch(input: UpdateRecipeDTO::class)
    ]
)]
#[Map(target: Recipe::class)]
final class RecipeDTO
{

    public int $id;
    public string $title;

    public string $category;

    public string $steps;
    public ?string $picture;

    public int $servings;

    public function getUrl(): string
    {
        if ($this->picture == null || str_starts_with($this->picture, 'http')) {
            return $this->picture;
        }
        return $_ENV['SERVER_URL'] . '/uploads/' . $this->picture;
    }

}