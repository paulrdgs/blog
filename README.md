get back-end ( prof you already have it)

Exécutez npm install.

Créez un fichier .env à partir du fichier .env.sample et ajoutez vos paramètres de base de données. Ne supprimez pas le fichier .env.sample, il doit être conservé.

```
APP_PORT=5050
FRONTEND_URL=http://localhost:5173
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT options
# Create a secret JWT decryption key.
# ex : JggP476!pKIJgF3
JWT_SECRET =
# Expiration timing 1h, 50s, 10m, u choose
JWT_TIMING = 10m
```
Adaptez au besoin database.sql avec vos propres tables. Importez le script dans votre serveur SQL. Vous pouvez le faire manuellement ou exécuter le script migrate :

npm run migrate
Démarrez le serveur en mode développement avec :

npm run dev
Cela exécutera index.js en utilisant nodemon.

Accédez à http://localhost:5050 avec votre navigateur préféré.


pour le front
------

clone project react

install node with 'npm i'

and start the front-end with 'npm run start'

