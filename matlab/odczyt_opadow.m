if exist('catchments', 'var') == 0
    catchments = loadCatchments();
    
    catchmentsSize = length(catchments);
    for i = 1:catchmentsSize
        catchment = catchments{1,i};
        assignin('base', strrep(catchment.n, '-', '_'), catchment.p);
    end
end

if exist('rainfallStations', 'var') == 0
    rainfallStations = loadRainfallStations();
end

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
vxlabels = arrayfun(@(n) {sprintf('%s', rainfallStations(1,n).name)}, (1:10)');
% Hpl = text(x, y, vxlabels, 'FontWeight', 'bold', 'HorizontalAlignment',...
%    'center', 'BackgroundColor', 'none');
ic = incenter(dt);
% numtri = size(dt,1);
% trilabels = arrayfun(@(x) {sprintf('T%d', x)}, (1:numtri)');
% Htl = text(ic(:,1), ic(:,2), trilabels, 'FontWeight', 'bold', ...
%    'HorizontalAlignment', 'center', 'Color', 'blue');
iloscZlewni = length(catchments);
for j = 1:iloscZlewni
    zlewnia = catchments{1, j}
    pointsAmmount = length(zlewnia.p);
    x = zeros(pointsAmmount, 1);
    y = zeros(pointsAmmount, 1);
    for i = 1:pointsAmmount
        x(i) = zlewnia.p{1,i}.x;
        y(i) = zlewnia.p{1,i}.y;
    end
    plot(x,y,'-r')
end
hold off