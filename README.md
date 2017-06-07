# Demontration fonctionnalités MFP 8

## Download code

Download code : https://github.com/fdut/ContactDevOps

## Test application sans MFP

- Mettre en commentaire dans index.html

```
	<!-- <script src="js/index.js"></script> -->
```
- Dans controller.js :

	**$scope.useMFPAdapter = false;**
	
	**$scope.useMFPSecurity = false;**

- Lancer les commandes suivantes :

```
	cordova plugins
	ionic serve
	cordova platform add android
	ionic emulate android
```

Si erreur :
SystemWebViewClient: URL blocked by whitelist:

cordova plugin add cordova-plugin-whitelist


## Ajout ObtenToken

- Demarrer le serveur local

>Supprimer la version existante dans l'émulateur si nécéssaire

- Decomenter dans index.html

```
	<!-- <script src="js/index.js"></script> -->
```

Puis

```
	cordova plugin add cordova-plugin-mfp
	mfpdev server info
	mfpdev app register
	cordova prepare

	ionic emulate android
```

- Premiére Visualisation analytics

## Ajout Adapter

- Montrer le contenue de l'adapter
- Lancer les commandes suivantes :

```
	cd contact-adapter
	cd contactAdapter
	mfpdev adapter build 
	mfpdev adapter deploy 
```

- Montrer l'adapter puis **Test Swagger**

- Dans l'application modifier controller.js

	**$scope.useMFPAdapter = true;**

- Lancer les commandes suivantes :

```
	ionic emulate android
```

Pour valider faire le test en desactivant l'accès aux services. (arrêter l'appli avant)

- Visualisation analytics

## Ajout Authentification

- Lancer les commandes suivantes :

```
	cd contact-adapter
	cd contactAuthAdapter

	mfpdev adapter build
	mfpdev adapter deploy
```

- Modifier la sécurté de l'application dans la console

- Ajouter **UserLogin** comme **"Portée d'application obligatoire"**

- Modifier l'application

	**$scope.useMFPSecurity = true;**

- Lancer la commande suivante :

```
	ionic emulate android
```
>**Note**:
>Si probléme de connection desactivé tout et réactivé tout :
>  $scope.useMFPAdapter = false;
>  $scope.useMFPSecurity = false;
> 
>puis
>
>  $scope.useMFPAdapter = true;
>  $scope.useMFPSecurity = true;

## Direct Update

- Modifier fichier js,css ou html et deploy web update --

- Exemple dans index.html remplacer :

```
	<div class="mainLogo">
		<img src="img/thumbnail.png" />
	</div>

```

par 

```
	<div class="mainLogo">
		<img src="img/ionic.png" />
	</div>

```

- Lancer la commande suivante :

```
	mfpdev app webupdate
```

## App Center

- Intall AppCenter
- Lancer l'url suivante dans le navigateur

http://bit.ly/2r56RdD

