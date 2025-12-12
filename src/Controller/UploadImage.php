<?php

namespace App\Controller;
use App\ApiResource\RecipeDTO;

use App\Entity\Recipe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;

#[AsController]
class UploadImage extends AbstractController {

    public function __construct(private ObjectMapperInterface $mapper,
    #[Autowire('%kernel.project_dir%/public/uploads')] private string $uploadDir,
    private EntityManagerInterface $manager) {
        
    }
    public function __invoke(Recipe $recipe, Request $request) {
        /**
         * @var File
         */
        $file = $request->files->get('file');
        
        $filename = uniqid().".jpg";
        $file->move($this->uploadDir, $filename);
        $recipe->setPicture($filename);
        $this->manager->flush();
        return $this->json($this->mapper->map($recipe, RecipeDTO::class));
    }
}
