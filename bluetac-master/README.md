# How to run this project

 Make sure that you are using Node 10.x. If the node version is higher the firebase functions will not work.

First install the firebase cli

https://firebaseopensource.com/projects/firebase/firebase-tools/

After installation complete you need to run 

```
firebase login
```

If you are in windows you might need to run

```
powershell Set-ExecutionPolicy RemoteSigned
```

## Steps
Now cd in to bluetac/functions ( **you need to go the functions folder** ) and run

```
npm install
```

after completion come back to bluetac folder and run ( This is to build the react app)
```
npm install
```
Then start the firebase functions (express app) locally
```
firebase serve --only functions
```
Now let's run the react app

```
npm start
```

!!!






