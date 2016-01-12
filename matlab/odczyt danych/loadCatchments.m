function [ catchments ] = loadCatchments( )
disp('Odczyt obszar�w zlewni zosta� rozpocz�ty.');
catchmentsJson = urlread('http://monitor.pogodynka.pl/api/coordinates/?catchments');
catchments = loadjson(catchmentsJson);
save('zlewnie.mat','catchments');
disp('Obszary zlewni zosta�y za�adowane i zapisane w pliku "zlewnie.mat".');
end

