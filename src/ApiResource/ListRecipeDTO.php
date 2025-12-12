<?php
namespace App\ApiResource;


use App\Entity\Recipe;

use Symfony\Component\ObjectMapper\Attribute\Map;

#[Map(target: Recipe::class)]
class ListRecipeDTO {
    
    public int $id;
    public string $title;
    public string $category;
    public ?string $picture;
    public function getUrl():string {
        if($this->picture == null || str_starts_with($this->picture, 'http')) {
            return $this->picture;
        }
        return $_ENV['SERVER_URL'].'/uploads/'.$this->picture;
    }
}