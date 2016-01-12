function [ catchments ] = loadCatchments( )
disp('Odczyt obszarów zlewni zosta³ rozpoczêty.');
catchmentsJson = urlread('http://monitor.pogodynka.pl/api/coordinates/?catchments');
catchments = loadjson(catchmentsJson);
save('zlewnie.mat','catchments');
disp('Obszary zlewni zosta³y za³adowane i zapisane w pliku "zlewnie.mat".');
end

