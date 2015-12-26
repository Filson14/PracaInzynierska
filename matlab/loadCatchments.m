function [ catchments ] = loadCatchments( )
%LOADCATCHMENTS Summary of this function goes here
%   Detailed explanation goes here
disp('Odczyt obszarów zlewni zosta³ rozpoczêty.');
catchmentsJson = urlread('http://monitor.pogodynka.pl/api/coordinates/?catchments');
catchments = loadjson(catchmentsJson);
disp('Obszary zlewni zosta³y za³adowane');
end

