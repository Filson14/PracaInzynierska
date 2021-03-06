function [ stations ] = loadRainfallStations( )
disp('Odczyt posterunków opadowych rozpoczęty.');
stationsJson = urlread('http://monitor.pogodynka.pl/api/map/?category=meteo');
tempData = loadjson(stationsJson);
nO = length(tempData);
stations = [];
for i = 1:nO,
    stations(i).id = tempData{1, i}.i;
    stations(i).name = tempData{1, i}.n;
    stations(i).longitude = tempData{1, i}.lo;
    stations(i).latitude = tempData{1, i}.la;
end
disp('Posterunki opadowe zostały załadowane');
end

