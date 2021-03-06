function [ rainfallData ] = readRainfallData( rainfallStations )
URL = 'http://monitor.pogodynka.pl/api/meteo/?id=';
stationsAmmount = length(rainfallStations);
rainfallData = [];
for i = 1:stationsAmmount,
    url = strcat(URL,num2str(rainfallStations(i).id));
    jsonData = urlread(url);
    station = loadjson(jsonData);
    disp(station.name);
    rainfallData(i).stationIndex = i;
    rainfallData(i).stationId = station.id;
    rainfallData(i).stationName = station.name;
    rainfallData(i).hourly = station.status.precip;
    rainfallData(i).daily = station.status.precipDaily;
    rainfallData(i).last48hours = station.hourlyPrecipRecords;
    rainfallData(i).lastWeek = station.dailyPrecipRecords;
end
file_name = strcat('precip_',datestr(now,'yyyy_mm_dd_HH_MM'),'.mat');
save(file_name,'rainfallData');
disp(['Dane opadowe zapisane w pliku ', file_name]);
end

