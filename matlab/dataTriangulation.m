%% Sprzπtanie
clear;
clc;
close all;

xAxisLabel = 'D≥ugoúÊ geograficzna';
yAxisLabel = 'SzerokoúÊ geograficzna';
zAxisLabel = 'WysokoúÊ opadu [mm]';
%% Przygotowanie danych do triangulacji
disp('Przygotowanie danych do obliczeÒ.');
load ('.\zapisane dane\rainfallPoints.mat');
load ('.\zapisane dane\catchment.mat');
% stationsAmmount = length(rainfallStations);

clear('borderPoints');
clear('interpolationPoints');
clear('poinsInsideCatchment');
% rainfallPoints = zeros(stationsAmmount, 3);
interpolationPoints = [];
borderPoints = [];
global middle_x;
global middle_y;

geoMiddleX = min(catchment(:, 1)) + (max(catchment(:, 1)) - min(catchment(:, 1)))/2;
geoMiddleY = min(catchment(:, 2)) + (max(catchment(:, 2)) - min(catchment(:, 2)))/2;

middle_x = geoMiddleX;
middle_y = geoMiddleY;

% for i = 1:stationsAmmount
%     rainfallPoints(i, 1) = rainfallStations(1, i).longitude;
%     rainfallPoints(i, 2) = rainfallStations(1, i).latitude;
% %     rainfallPoints(i, 3) = rlPrecip(rainfallPoints(i,1), rainfallPoints(i,2));
% end
%% Konwersja wspÛ≥rzÍdnych geograficznych na kilometry
% SzerokoúÊ geograficzna
% 1 stopieÒ = 111196,672 m
% èrÛd≥o: wikipedia
%disp('Konwersja wspÛ≥rzÍdnych na wartoúci metryczne');
alfa = min(rainfallPoints(:, 2)) + (max(rainfallPoints(:, 2)) - min(rainfallPoints(:, 2)))/2;
R = 6371;                           % åredni promieÒ Ziemi w km
r = cos(alfa*2*pi/360) * R;
parallelLength = 2 * pi * r;
xDegree = parallelLength / 360;    % w km
yDegree = 111.196672;              % w km

metricMiddleX = geoMiddleX * xDegree * 1000; % w metrach
metricMiddleY = geoMiddleY * yDegree * 1000; % w metrach
middle_x = metricMiddleX;
middle_y = metricMiddleY;

ellipsoidalPrecip(rainfallPoints(:,1), rainfallPoints(:,2))
pause;

% rainfallPoints = [rainfallPoints(:, 1).*xDegree rainfallPoints(:, 2).*yDegree rainfallPoints(:, 3)];
% catchment = [catchment(:,1).*xDegree, catchment(:,2).*yDegree];
%% Usuwanie pojedynczych posterunkÛw
% figure
% hold on;
% triplot(dt, 'y');
% plot(pointsInsideCatchment(:,1),pointsInsideCatchment(:,2),'k.','MarkerSize',5,'LineWidth',1);
% plot(catchment(:,1), catchment(:,2), 'r');
% insidePoints = size(pointsInsideCatchment,1);
%  labels = arrayfun(@(x) {sprintf('%d', x)}, (1:insidePoints)');
% text(pointsInsideCatchment(:,1), pointsInsideCatchment(:,2),labels,'HorizontalAlignment','center', 'VerticalAlignment', 'bottom');
% xlabel(xAxisLabel);
% ylabel(yAxisLabel);
% hold off;
%% Prezentacja danych wejúciowych
figure;
hold on;
ylabel(yAxisLabel);
xlabel(xAxisLabel);

plot(rainfallPoints(:,1), rainfallPoints(:,2) ,'o', 'MarkerSize', 2, 'MarkerFaceColor','black','MarkerEdgeColor','black');
plot(catchment(:,1), catchment(:, 2),'-r');

hold off;
%% Triangulacja punktÛw
disp('Triangulacja punktÛw wejúciowych.');
figure
hold on;
ylabel(yAxisLabel)
xlabel(xAxisLabel)
dt = delaunayTriangulation(rainfallPoints(:, 1), rainfallPoints(:, 2));
triplot(dt, '-yo', 'MarkerSize', 2, 'MarkerFaceColor','black','MarkerEdgeColor','black');
%% Rysowanie obszaru zlewni na wykresie
disp('Zlewnia na wykresie');
plot(catchment(:,1), catchment(:, 2),'-r');

%% Wyznaczanie wektorÛw normalnych dla poszczegÛlnych trÛjkπtÛw
disp('Wyznaczanie wektorÛw normalnych dla p≥aszczyzn poszczegÛlnych trÛjkπtÛw.');
numtri = length(dt.ConnectivityList);
triangleVectors = zeros(numtri, 3);
for i = 1:numtri
    triangle = dt.ConnectivityList(i, :);
    A = [rainfallPoints(triangle(1), 1), rainfallPoints(triangle(1), 2), rainfallPoints(triangle(1), 3)];
    B = [rainfallPoints(triangle(2), 1), rainfallPoints(triangle(2), 2), rainfallPoints(triangle(2), 3)];
    C = [rainfallPoints(triangle(3), 1), rainfallPoints(triangle(3), 2), rainfallPoints(triangle(3), 3)];
    
    AB = [B(1) - A(1), B(2) - A(2), B(3) - A(3)];
    BC = [C(1) - B(1), C(2) - B(2), C(3) - B(3)];
    
    triangleVectors(i,:) = cross(AB, BC);
end

%% Punkty przeciÍcia granicy zlewni z odcinkami triangulacji
disp('Interpolacja wartoúci dla wÍz≥Ûw granic zlewni oraz punktÛw przeciÍcia granicy zlewni z liniami triangulacji.');
x = catchment(:, 1);
y = catchment(:, 2);
pointsAmmount = length(x);
tic
for i = 1:pointsAmmount
    if i ~= 1
        line = [x(i-1) y(i-1) x(i) y(i)];
        numtri = length(dt.ConnectivityList);
        checkedLines = zeros(0,2);
        for j = 1:numtri
            triangle = dt.ConnectivityList(j, :);
            
            triangle_vx = [rainfallPoints(triangle(1),1),rainfallPoints(triangle(2),1),rainfallPoints(triangle(3),1)];
            triangle_vy = [rainfallPoints(triangle(1),2),rainfallPoints(triangle(2),2),rainfallPoints(triangle(3),2)];
            
            if max(inpolygon(x(i), y(i), triangle_vx, triangle_vy)) == 1
                point_value = findValueFromSurface(x(i), y(i), triangleVectors(j,:), rainfallPoints(triangle(1),:));
                borderPoints = [borderPoints; [x(i), y(i), point_value]];
                h = plot(x(i),y(i),'bo','MarkerSize',5,'LineWidth',1);
                %%%%%%% Prezentacja interpolacji p≥aszczyznπ
%                 if i == 123
%                     figure
%                     hold on;
%                     plot([triangle_vx'; triangle_vx(1)], [triangle_vy'; triangle_vy(1)], '-ro');
%                     triangle_vz = [rainfallPoints(triangle(1),3),rainfallPoints(triangle(2),3),rainfallPoints(triangle(3),3)];
%                     ft = 'linearinterp';
%                     opts = fitoptions( ft );
%                     opts.Weights = zeros(1,0);
%                     opts.Normalize = 'on';
%                     fitresult = fit( [triangle_vx', triangle_vy'], triangle_vz', ft, opts );
%                     
%                     plot( fitresult, [triangle_vx', triangle_vy'], triangle_vz' );
%                     
%                     xlabel(xAxisLabel);
%                     ylabel(yAxisLabel);
%                     zlabel(zAxisLabel);
%                     hold off;
%                     pause
%                 end
                %%%%%%%%%%%%%%%%%%%%%%%%%
            end
            
            for k = 1:3
                v1_number = triangle(k);
                v2_number = triangle(mod(k, 3) + 1);
                
                endOne = rainfallPoints(v1_number, :);
                endTwo = rainfallPoints(v2_number, :);
                
                if ismember([v1_number v2_number], checkedLines, 'rows') == 0 && ismember([v2_number v1_number], checkedLines, 'rows') == 0
                    checkedLines = [checkedLines; [v1_number v2_number] ];
                    line2 = [endOne(1) endOne(2) endTwo(1) endTwo(2)];
                    [intersect_x, intersect_y] = lineintersect(line, line2);
                    if ~isnan(intersect_x)
                        h=plot(intersect_x,intersect_y,'rx','MarkerSize',10,'LineWidth',2);
                        intersect_z = findValueFromSurface(intersect_x, intersect_y, triangleVectors(j,:), rainfallPoints(triangle(1),:));
                        interpolationPoints = [interpolationPoints; [intersect_x, intersect_y, intersect_z]];
                    end
                end
            end
        end
        clear('checkedLines');
    end
end;
toc
%% Punkty dane znajdujπce siÍ wewnπtrz obszaru zlewni
disp('Filtrowanie punktÛw znanych znajdujπcych siÍ wewnπtrz zlewni.');
pointsInsideCatchment = stationsInsideCatchment(catchment(:,1), catchment(:,2), rainfallPoints);
triPoints = [borderPoints; interpolationPoints; pointsInsideCatchment];
h=plot(pointsInsideCatchment(:,1),pointsInsideCatchment(:,2),'ro','MarkerSize',5,'LineWidth',1);
hold off;
%% Dane dla drugiej sieci trÛjkπtÛw
figure
hold on;
xlabel(xAxisLabel);
ylabel(yAxisLabel);
plot(catchment(:,1), catchment(:,2), '-r');
plot(triPoints(:,1), triPoints(:,2) ,'o', 'MarkerSize', 2, 'MarkerFaceColor','black','MarkerEdgeColor','black');
hold off;

%% Druga triangulacja - punkty dane i interpolowane.
%  Wyznaczenie opadu powierzchniowego
disp('Triangulacja wraz z punktami interpolowanymi.');
figure
hold on;

boarderPtsAmmount = length(borderPoints);

C = [(1:(boarderPtsAmmount - 1))' (2:boarderPtsAmmount)'; boarderPtsAmmount 1];
triangulation = delaunayTriangulation(triPoints(:, 1), triPoints(:, 2), C);
triplot(triangulation, 'b');
plot([triPoints(1:boarderPtsAmmount,1); triPoints(1,1)], [triPoints(1:boarderPtsAmmount,2); triPoints(1,2)], '-r','LineWidth',2);
ylabel(yAxisLabel)
xlabel(xAxisLabel)
% ic = incenter(triangulation);
% numtri = size(triangulation,1);
% trilabels = arrayfun(@(x) {sprintf('T%d', x)}, (1:numtri)');
% Htl = text(ic(:,1), ic(:,2), trilabels, 'FontWeight', 'bold', ...
% 'HorizontalAlignment', 'center', 'Color', 'blue');
hold off;
%% Wyznaczenie trÛjkπtÛw wewnπtrz granicy
disp('Wyznaczanie trÛjkπtÛw wewnπtrz granicy zlewni.');
figure;
hold on;
IO = isInterior(triangulation);
properTriangles = triangulation(IO, :);
triplot(triangulation(IO, :),triPoints(:,1), triPoints(:,2),'LineWidth', 1)
plot(triPoints(C'),triPoints(C'+size(triPoints,1)),'-r','LineWidth', 2);
ylabel(yAxisLabel)
xlabel(xAxisLabel)
hold off;
%% Pole wieloboku - polyarea
% UøyÊ properTriangles i triPoints
disp('Wyznaczanie objÍtoúci opadu w poszczegÛlnych trÛjkπtach i ca≥ej zlewni.');
figure
hold on;
properTrianglesAmmount = length(properTriangles);
volumes = zeros(properTrianglesAmmount, 2);
middle_x
middle_y
% middle_x = middle_x * xDegree * 1000
% middle_y = middle_y * yDegree * 1000

for i = 1:properTrianglesAmmount
    triangle = properTriangles(i, :);
    
    points = [
        triPoints(triangle(1),:);
        triPoints(triangle(2),:);
        triPoints(triangle(3),:);
        ];
%     points(:,1) = points(:,1).*xDegree;
%     points(:,2) = points(:,2).*yDegree;
    
    
    plot([points(:,1);points(1,1)], [points(:,2);points(1,2)]);
    baseField = polyarea([points(:,1);points(1,1)], [points(:,2);points(1,2)]) * 1000000; % 1 km2 = 1 000 000 m2
    avgHeight = mean(points(:,3)) * 0.001;  % 1 mm = 0.001 m
    volumes(i, 1) = baseField * avgHeight;     % w m3
    volumes(i, 2) = opad_na_trojkacie(@ellipsoidalPrecip, points(:,1)', points(:,2)');
%      plot([points(:,1);points(1,1)],[points(:,2);points(1,2)])
end
ylabel(yAxisLabel)
xlabel(xAxisLabel)
hold off;
disp('ObjÍtoúci opadu w poszczegÛlnych trÛjkπtach zapisana w macierzy volumes.');
totalRainfall = sum(volumes(:,1));
totalRealRainfall = sum(volumes(:,2));
disp(strcat('£πczny opad powierzchniowy dla zlewni wynosi', {' '}, num2str(totalRainfall),{' '}, 'm3'));
disp(strcat('Rzeczywista objÍtoúÊ opadu dla zlewni wynosi', {' '}, num2str(totalRealRainfall),{' '}, 'm3'));