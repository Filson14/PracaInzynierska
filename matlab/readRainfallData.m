function [ rainfallData ] = readRainfallData( rainfallStations )
%UNTITLED Summary of this function goes here
%   Detailed explanation goes here

  URL = 'http://monitor.pogodynka.pl/api/meteo/?id=';
  stationsAmmount = length(rainfallStations); 
  rainfallData = [];
  for i = 1:stationsAmmount,
    url = strcat(URL,num2str(rainfallStations(i).id));
    jsonData = urlread(url);
    station = loadjson(jsonData);
    station.name
    rainfallData(i).stationIndex = i;
    rainfallData(i).stationId = station.id;
    rainfallData(i).stationName = station.name; 
    rainfallData(i).hourly = station.status.precip;
    rainfallData(i).daily = station.status.precipDaily;
  end  
  
  file_name = strcat('precip_',datestr(now,'yyyy_mm_dd_HH_MM'),'.mat');
  save(file_name,'rainfallData');
  disp(['PO zapisane w pliku ', file_name]);

end

