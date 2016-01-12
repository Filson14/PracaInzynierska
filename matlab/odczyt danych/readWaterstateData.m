function [ waterstateData ] = readWaterstateData( waterstateStations )
URL = 'http://monitor.pogodynka.pl/api/hydro/?id=';
stationsAmmount = length(waterstateStations);
waterstateData = [];
for i = 1:stationsAmmount,
    url = strcat(URL,num2str(waterstateStations(i).id));
    jsonData = urlread(url);
    station = loadjson(jsonData);
    station.name
    waterstateData(i).stationIndex = i;
    waterstateData(i).stationId = station.id;
    waterstateData(i).stationName = station.name;
    waterstateData(i).value = station.status.currentValue;
    waterstateData(i).measurementDate = station.status.currentDate;
    waterstateData(i).waterstateLast72hours = station.waterStateRecords;
    waterstateData(i).dischargeLast72hours = station.dischargeRecords;
end
file_name = strcat('waterstate_',datestr(now,'yyyy_mm_dd_HH_MM'),'.mat');
save(file_name,'waterstateData');
disp(['Dane wodowskazowe zapisane w pliku ', file_name]);
end

