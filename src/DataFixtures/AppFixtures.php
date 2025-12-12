<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use App\Entity\Recipe;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i=0; $i < 20; $i++) { 
            $ingredientsLabel = ['Flour', 'Sugar', 'Salt', 'Water', 'Milk', 'Eggs', 'Fruits'];
            $titles = ['Pie', 'Cake', 'Pastry'];
            
            $recipe = new Recipe();
            $recipe->setTitle($titles[array_rand($titles, 1)]);
            $recipe->setCategory('category'.random_int(1,3));
            $recipe->setServings(random_int(2,6));
            $recipe->setSteps("1. First step\n2. Second step\n3. Third step");
            $recipe->setPicture(strtolower($recipe->getTitle()).'.jpg');
            for($j=0; $j < random_int(3, 7); $j++) {
                shuffle($ingredientsLabel);
                $ingredient = new Ingredient();
                $ingredient->setLabel(array_pop($ingredientsLabel));
                $ingredient->setRecipe($recipe);
                $ingredient->setUnit('grams');
                $ingredient->setQuantity(random_int(5, 200));
                $manager->persist($ingredient);
            }
            $manager->persist($recipe);
        }

        $manager->flush();
    }
}
