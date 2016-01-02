%% Odczyt zlewni
if exist('catchments', 'var') == 0
    catchments = loadCatchments();
    catchmentsSize = length(catchments);
    for i = 1:catchmentsSize
        catchment = catchments{1,i};
        assignin('base', strrep(catchment.n, '-', '_'), catchment.p);
    end
end
%% Odczyt posterunk�w opadowych z pogodynka.pl
if exist('allRainfallStations', 'var') == 0
    allRainfallStations = loadRainfallStations();
end
%% Odczyt posterunk�w wodowskazowych z pogodynka.pl
if exist('allWaterstateStations', 'var') == 0
    allWaterstateStations = loadWaterstateStations();
end
%% Ograniczenie obszaru posterunk�w opadowych do tych obejmuj�cych zlewni� Warty do We�ny
allStationsAmmount = length(allRainfallStations);
index = 0;
clear('rainfallStations');
for i = 1:allStationsAmmount
    station = allRainfallStations(i);
    if station.longitude > 15.9 && station.longitude < 20 && station.latitude > 50.4 && station.latitude < 53
        index = index + 1;
        rainfallStations(index) = station;
    end;
end

% rainfallStations = allRainfallStations;