echo on
echo Inicializando puertos...
echo off
git pull
start cmd /c forever stopall
Pushd "C:\\Users\wisin\interred-backend"
git pull
start /min cmd /c forever start -c node .\
Popd
yarn start