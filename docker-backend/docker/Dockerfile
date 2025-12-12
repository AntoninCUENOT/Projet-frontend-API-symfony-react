# Backend Dockerfile (Symfony + PHP-FPM)
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpng-dev \
    && docker-php-ext-install intl zip pdo pdo_mysql gd

WORKDIR /var/www/html

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

CMD ["php-fpm"]
