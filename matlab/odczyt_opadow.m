%% Odczyt zlewni
if exist('catchments', 'var') == 0
    catchments = loadCatchments();
    catchmentsSize = length(catchments);
    for i = 1:catchmentsSize
        catchment = catchments{1,i};
        assignin('base', strrep(catchment.n, '-', '_'), catchment.p);
    end
end
%% Odczyt posterunków opadowych z pogodynka.pl
if exist('allRainfallStations', 'var') == 0
    allRainfallStations = loadRainfallStations();
end
%% Odczyt posterunków wodowskazowych z pogodynka.pl
if exist('allWaterstateStations', 'var') == 0
    allWaterstateStations = loadWaterstateStations();
end
%% Ograniczenie obszaru posterunków opadowych do tych obejmuj¹cych zlewniê Warty do We³ny
allStationsAmmount = length(allRainfallStations);
index = 0;
clear('rainfallStations');
for i = 1:allStationsAmmount
    station = allRainfallStations(i);
    if station.longitude > 15.6 && station.longitude < 20 && station.latitude > 50.4 && station.latitude < 53
        index = index + 1;
        rainfallStations(index) = station;
    end;
end
%%
  %rainfallData = readRainfallData(rainfallStations);

stationsAmmount = length(rainfallStations);
triangulation_X = zeros(stationsAmmount, 1);
triangulation_Y = zeros(stationsAmmount, 1);
for i = 1:stationsAmmount
    triangulation_X(i, 1) = rainfallStations(1, i).longitude;
    triangulation_Y(i, 1) = rainfallStations(1, i).latitude;
end

dt = delaunayTriangulation(triangulation_X,triangulation_Y);

triplot(dt, 'y');
%
% Display the Vertex and Triangle labels on the plot
hold on
vxlabels = arrayfun(@(n) {sprintf('%s', 'a')}, (1:stationsAmmount)');
Hpl = text(triangulation_X, triangulation_Y, vxlabels, 'FontWeight', 'bold', 'HorizontalAlignment',...
   'center', 'BackgroundColor', 'none');
ic = incenter(dt);
% % numtri = size(dt,1);
% % trilabels = arrayfun(@(x) {sprintf('T%d', x)}, (1:numtri)');
% % Htl = text(ic(:,1), ic(:,2), trilabels, 'FontWeight', 'bold', ...
% %    'HorizontalAlignment', 'center', 'Color', 'blue');
% iloscZlewni = length(catchments);
% for j = 1:iloscZlewni
%     zlewnia = catchments{1, j}
zlewnia.p = Warta_do_Welny;
    pointsAmmount = length(zlewnia.p);
    x = zeros(pointsAmmount, 1);
    y = zeros(pointsAmmount, 1);
    for i = 1:pointsAmmount
        x(i) = zlewnia.p{1,i}.x;
        y(i) = zlewnia.p{1,i}.y;
    end
    plot(x,y,'-r')
% end
% hold off