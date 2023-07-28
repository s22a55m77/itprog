FROM php:8.2.4-apache

COPY php.ini /usr/local/etc/php/conf.d/

WORKDIR /var/www/html/

COPY . /var/www/html/

RUN docker-php-ext-install mysqli

RUN echo "ErrorDocument 404 /index.php" >> /etc/apache2/apache2.conf

EXPOSE 80
