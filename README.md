<h1>Teste em um Sistema Distribuido</h1>

1. Emails de teste:

* test@gmail.com
* sara@gmail.com
* john@gmail.com
* peter@gmail.com

2. Para ver em que eventos um utilizador esta registado aceder à opção do NavBar chamada <b> My Events </b>

3. Caso queiram apagar os registos efetuados, aceder no pod do mysql e fazer:
   - ```kubectl exec -it <pod-name>  -n sge -- mysql -u root -p```
   - Dar Enter quando pedir a password
   - USE sd;
   - DELETE FROM user_event_registration;

<h1>Instalação</h1>

Instalar o php 8.2.12 -> https://windows.php.net/downloads/releases/php-8.2.12-Win32-vs16-x64.zip

No ficheiro php.ini do php instalado descomentar (tirar ";") as linhas que contenham as seguintes coisas:
 
1. extension=pdo_mysql
2. extension=mysqli
3. extension=fileinfo

Instalar XAMPP para php 8.2.4 -> https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.4/xampp-windows-x64-8.2.4-0-VS16-installer.exe

Instalar composer -> https://getcomposer.org/Composer-Setup.exe

-----------------------------

Para correr a aplicação executar os seguintes comandos:<br>
Na pasta Server:
1. npm install 
2. composer install
3. Dar click em start no apache e MySQL dentro XAMPP Control Panel
4. Dar click no admin do MySQL e na interface web criar uma base de dados com
   - name: sd
   - collection: utf8_general_ci
6. Criar o ficheiro .env caso ainda nao esteja criado (Copiar o conteudo do ficheiro .env.example)
7. No ficheiro .env que esta no Laravel colocar as credencias (normalmente é apenas preciso mudar o DB_DATABASE: sd)
8. php artisan migrate 
9. php artisan db:seed
10. php artisan serve (para executar o backend)

Na pasta client: <br>
9. aceder à pasta react fazendo cd react
10. npm install
11. npm run dev

Para aceder a rutas protegidas por keys, fazer: <br>

12. php artisan passport:client --personal
13. Colocar a key obtida no ficheiro de teste
14. Nas consultas feitas à api colocar a key como dentro de header conforme feito nos ficheiros de teste

<br><br>IMPORTANTE: para executar o projeto é preciso ter o XAMPP ativo
