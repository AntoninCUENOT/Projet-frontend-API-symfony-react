<?php


namespace App\Mapper;

use Symfony\Component\ObjectMapper\ObjectMapperInterface;
use Symfony\Component\ObjectMapper\TransformCallableInterface;

 class DtoCollection implements TransformCallableInterface {

    public function __construct(private ObjectMapperInterface $mapper) {
    }

    public function __invoke(mixed $value, object $source, object|null $target): mixed {
        if($value == null) {
            return $value;
        }
        
        $mapped = array_map( [$this->mapper,'map'], $value);
        return $mapped;
    }
   
 }