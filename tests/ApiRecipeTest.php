<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\ApiResource\RecipeDTO;

class ApiRecipeTest extends ApiTestCase
{
    
    public function testGetCollection(): void
    {
        $response = static::createClient()->request('GET', '/api/recipes');

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceCollectionJsonSchema(RecipeDTO::class);

    }


    public function testGetOne(): void
    {
        $response = static::createClient()->request('GET', '/api/recipes/1');

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(RecipeDTO::class);

    }


    public function testGetOneNotFound(): void
    {

        $response = static::createClient()->request('GET', '/api/recipes/100');

        $this->assertResponseStatusCodeSame(404);
    }




    public function testPostSuccess(): void
    {
        $response = static::createClient()->request('POST', '/api/recipes', [
            
                'json' => [
                    "title"=> "test",
                    "category"=> "test",
                    "steps"=> "step tests",
                    "picture"=> "test",
                    "servings"=> 2,
                    "ingredients"=> [
                        [
                            "label"=> "ingredient1",
                            "unit"=> "grams",
                            "quantity"=> 100
                        ],
                        [
                            "label"=> "ingredient2",
                            "unit"=> "grams",
                            "quantity"=> 100
                        ]
                    ]
                ]
            
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(RecipeDTO::class);

    }

    public function testPostValidationErrors(): void
    {
        $response = static::createClient()->request('POST', '/api/recipes', [
            
                'json' => [
                    "title"=> "test",
                  
                ]
            
        ]);

        $this->assertResponseIsUnprocessable();

        
    }

        public function testPatchSuccess(): void
    {
        $response = static::createClient()->request('PATCH', '/api/recipes/2', [
            
                'json' => [
                    "title"=> "test",
                    "category"=> "test",
                    "steps"=> "step tests",
                    "picture"=> "test",
                    "servings"=> 2,
                    "ingredients"=> [
                        [
                            "label"=> "ingredient1",
                            "unit"=> "grams",
                            "quantity"=> 100
                        ],
                        [
                            "label"=> "ingredient2",
                            "unit"=> "grams",
                            "quantity"=> 100
                        ]
                    ]
                ]
            
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertMatchesResourceItemJsonSchema(RecipeDTO::class);

    }

    public function testDeleteSuccess(): void
    {
        $response = static::createClient()->request('DELETE', '/api/recipes/2');

        $this->assertResponseIsSuccessful();
        

    }

    
    public function testGetIngredients(): void
    {
        $response = static::createClient()->request('GET', '/api/recipes/1/ingredients');

        $this->assertResponseIsSuccessful();
        $this->assertMatchesJsonSchema([
            [
                "id"=> "number",
                "label"=> "string",
                "unit"=> "string",
                "quantity"=> "number"
            ]
        ]);
    }
}
