%% Sprz¹tanie
clear;
clc;
close all;

%% Przygotowanie danych do triangulacji
disp('Przygotowanie danych do obliczeñ.');
load ('.\zapisane dane\rainfallStations.mat');
load ('.\zapisane dane\catchment.mat');
stationsAmmount = length(rainfallStations);

clear('rainfallPoints');
clear('borderPoints');
clear('interpolationPoints');
clear('poinsInsideCatchment');
rainfallPoints = zeros(stationsAmmount, 3);
interpolationPoints = [];
borderPoints = [];
for i = 1:stationsAmmount
    rainfallPoints(i, 1) = rainfallStations(1, i).longitude;
    rainfallPoints(i, 2) = rainfallStations(1, i).latitude;
    rainfallPoints(i, 3) = rand(1) * 10;
end

%% Triangulacja punktów
disp('Triangulacja punktów wejœciowych.');
figure
hold on;
dt = delaunayTriangulation(rainfallPoints(:, 1), rainfallPoints(:, 2));
triplot(dt, 'y');

%% Rysowanie obszaru zlewni na wykresie
disp('Zlewnia na wykresie');
plot(catchment(:,1), catchment(:, 2),'-r');

%% Wyznaczanie wektorów normalnych dla poszczególnych trójk¹tów
disp('Wyznaczanie wektorów normalnych dla p³aszczyzn poszczególnych trójk¹tów.');
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

%% Punkty przeciêcia granicy zlewni z odcinkami triangulacji
disp('Interpolacja wartoœci dla wêz³ów granic zlewni oraz punktów przeciêcia granicy zlewni z liniami triangulacji.');
x = catchment(:, 1);
y = catchment(:, 2);
ilPunktow = length(x);

for i = 1:ilPunktow
    if i ~= 1
        line = [x(i-1) y(i-1) x(i) y(i)];
        numtri = length(dt.ConnectivityList);
        for j = 1:numtri
            triangle = dt.ConnectivityList(j, :);
            
            triangle_vx = [rainfallPoints(triangle(1),1),rainfallPoints(triangle(2),1),rainfallPoints(triangle(3),1)];
            triangle_vy = [rainfallPoints(triangle(1),2),rainfallPoints(triangle(2),2),rainfallPoints(triangle(3),2)];
            
            if max(inpolygon(x(i), y(i), triangle_vx, triangle_vy)) == 1
                point_value = findValueFromSurface(x(i), y(i), triangleVectors(j,:), rainfallPoints(triangle(1),:));
                borderPoints = [borderPoints; [x(i), y(i), point_value]];
                h=plot(x(i),y(i),'bo','MarkerSize',5,'LineWidth',1);
            end
            
            % TODO: Dla przyspieszenia mo¿na zapisywaæ sprawdzone odcinki
            % trójk¹tów ¿eby nie powtarzaæ.
            for k = 1:3
                endOne = rainfallPoints(triangle(k), :);
                endTwo = rainfallPoints(triangle(mod(k, 3) + 1), :);
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
end;

ylabel('Szerokoœæ geograficzna')
xlabel('D³ugoœæ geograficzna')

%% Punkty dane znajduj¹ce siê wewn¹trz obszaru zlewni
pointsInsideCatchment = stationsInsideCatchment(x, y, rainfallPoints);
triPoints = [borderPoints; interpolationPoints; pointsInsideCatchment];
h=plot(pointsInsideCatchment(:,1),pointsInsideCatchment(:,2),'ro','MarkerSize',5,'LineWidth',1);

%% Druga triangulacja - punkty dane i interpolowane.
%  Wyznaczenie opadu powierzchniowego
disp('Triangulacja wraz z punktami interpolowanymi.');
figure
hold on;

boarderPtsAmmount = length(borderPoints)

C = [(1:(boarderPtsAmmount - 1))' (2:boarderPtsAmmount)'; boarderPtsAmmount 1];
triangulation = delaunayTriangulation(triPoints(:, 1), triPoints(:, 2), C);
triplot(triangulation, 'b');
plot([triPoints(1:boarderPtsAmmount,1); triPoints(1,1)], [triPoints(1:boarderPtsAmmount,2); triPoints(1,2)], '-r','LineWidth',2);

%% Wyznaczenie trójk¹tów wewn¹trz granicy
figure;
hold on;
IO = isInterior(triangulation);
properTriangles = triangulation(IO, :);
triplot(triangulation(IO, :),triangulation.Points(:,1), triangulation.Points(:,2),'LineWidth', 1)
plot(triPoints(C'),triPoints(C'+size(triPoints,1)),'-r','LineWidth', 2);

% %% Pole wieloboku - polyarea
% U¿yæ properTriangles i triPoints

