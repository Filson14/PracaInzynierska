function [ catchments ] = loadCatchments( )
%LOADCATCHMENTS Summary of this function goes here
%   Detailed explanation goes here
disp('Odczyt obszar�w zlewni zosta� rozpocz�ty.');
catchmentsJson = urlread('http://monitor.pogodynka.pl/api/coordinates/?catchments');
catchments = loadjson(catchmentsJson);
disp('Obszary zlewni zosta�y za�adowane');
end

