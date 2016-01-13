%% Automatyka usuwania pojedynczego posterunku
clear;

tic
load ('.\zapisane dane\rainfallPoints.mat');
load ('.\zapisane dane\catchment.mat');
pointsToDelete = stationsInsideCatchment(catchment(:,1), catchment(:,2), rainfallPoints);
analytics = zeros(length(pointsToDelete)+1, 4);
pos = 23;
% for pos = 0:length(pointsToDelete)
    %% Sprz¹tanie
    clearvars -except pointsToDelete toDelete pos analytics;
    clc;
    close all;
    xAxisLabel = 'X [m]';
    yAxisLabel = 'Y [m]';
    zAxisLabel = 'Wysokoœæ opadu [mm]';
    
    %% Usuniêcie posterunku
    disp(strcat('Rozpoczêto analizê bez punktu nr', {' '}, num2str(pos)));
    if pos ~= 0
        toDelete = pointsToDelete(pos,:);
        analytics(pos+1,1) = pos;
    end
    
    %% Przygotowanie danych wejœciowych
    disp('Przygotowanie danych wejœciowych.');
    load ('.\zapisane dane\rainfallPoints.mat');
    load ('.\zapisane dane\catchment.mat');

    interpolationPoints = [];
    borderPoints = [];
    
    global middle_x;
    global middle_y;
    
    geoMiddleX = min(catchment(:, 1)) + (max(catchment(:, 1)) - min(catchment(:, 1)))/2;
    geoMiddleY = min(catchment(:, 2)) + (max(catchment(:, 2)) - min(catchment(:, 2)))/2;
    
    middle_x = geoMiddleX;
    middle_y = geoMiddleY;
    
    %% Konwersja wspó³rzêdnych geograficznych na kilometry
    % Szerokoœæ geograficzna
    % 1 stopieñ = 111196,672 m
    % ród³o: wikipedia
    disp('Konwersja wspó³rzêdnych na wartoœci metryczne');
    alfa = min(rainfallPoints(:, 2)) + (max(rainfallPoints(:, 2)) - min(rainfallPoints(:, 2)))/2;
    R = 6378410;                       % Promieñ równikowy Ziemi w metrach
    r = cos(alfa*2*pi/360) * R;
    parallelLength = 2 * pi * r;
    xDegree = (parallelLength / 360);  % w metrach
    yDegree = 111196.672;              % w metrach
    
    metricMiddleX = geoMiddleX * xDegree; % w metrach
    metricMiddleY = geoMiddleY * yDegree; % w metrach
    middle_x = metricMiddleX;
    middle_y = metricMiddleY;
    
    rainfallPoints = [rainfallPoints(:, 1).*xDegree rainfallPoints(:, 2).*yDegree rainfallPoints(:, 3)];
    catchment = [catchment(:,1).*xDegree, catchment(:,2).*yDegree];
    
    if pos ~= 0
        toDelete = [toDelete(:,1).*xDegree, toDelete(:,2).*yDegree];
    end
    
    %% Indentyfikatory posterunków wewn¹trz zlewni
%     figure
%     hold on;
%     triplot(dt, 'y');
%     plot(pointsInsideCatchment(:,1),pointsInsideCatchment(:,2),'k.','MarkerSize',5,'LineWidth',1);
%     plot(catchment(:,1), catchment(:,2), 'r');
%     insidePoints = size(pointsInsideCatchment,1);
%      labels = arrayfun(@(x) {sprintf('%d', x)}, (1:insidePoints)');
%     text(pointsInsideCatchment(:,1), pointsInsideCatchment(:,2),labels,'HorizontalAlignment','center', 'VerticalAlignment', 'bottom');
%     xlabel(xAxisLabel);
%     ylabel(yAxisLabel);
%     hold off;
    %% Usuwanie pojedynczych posterunków
    if pos ~= 0
        [~,index]=ismember([toDelete(:,1:2) 0],rainfallPoints,'rows');
        if index > 0
            if index == 1
                rainfallPoints = [rainfallPoints(2:end, :)];
            elseif index == length(rainfallPoints)
                rainfallPoints = [rainfallPoints(1:end-1, :)];
            else
                rainfallPoints = [rainfallPoints(1:(index-1), :); rainfallPoints((index+1):end, :)];
            end
        end
    end
    
    %% Generowanie wartoœci opadu
    rainfallPoints(:,3) = paraboloidalPrecip(rainfallPoints(:,1), rainfallPoints(:,2));
%     rainfallPoints(:,3) = rationalPrecip(rainfallPoints(:,1), rainfallPoints(:,2));
    %% Prezentacja danych wejœciowych
    figure;
    hold on;
    ylabel(yAxisLabel);
    xlabel(xAxisLabel);
    
    plot(rainfallPoints(:,1), rainfallPoints(:,2) ,'o', 'MarkerSize', 2, 'MarkerFaceColor','black','MarkerEdgeColor','black');
    plot(catchment(:,1), catchment(:, 2),'-r');
    
    hold off;
    %% Triangulacja punktów
    disp('Triangulacja punktów wejœciowych.');
    figure
    hold on;
    ylabel(yAxisLabel)
    xlabel(xAxisLabel)
    dt = delaunayTriangulation(rainfallPoints(:, 1), rainfallPoints(:, 2));
    triplot(dt, '-yo', 'MarkerSize', 2, 'MarkerFaceColor','black','MarkerEdgeColor','black');
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
    pointsAmmount = length(x);
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
%                     %%%%%% Prezentacja interpolacji p³aszczyzn¹
%                                     if i == 106
%                                         figure
%                                         hold on;
%                                         plot([triangle_vx'; triangle_vx(1)], [triangle_vy'; triangle_vy(1)], '-ro');
%                                         triangle_vz = [rainfallPoints(triangle(1),3),rainfallPoints(triangle(2),3),rainfallPoints(triangle(3),3)];
%                                         ft = 'linearinterp';
%                                         opts = fitoptions( ft );
%                                         opts.Weights = zeros(1,0);
%                                         opts.Normalize = 'on';
%                                         fitresult = fit( [triangle_vx', triangle_vy'], triangle_vz', ft, opts );
%                     
%                                         plot( fitresult, [triangle_vx', triangle_vy'], triangle_vz' );
%                     
%                                         xlabel(xAxisLabel);
%                                         ylabel(yAxisLabel);
%                                         zlabel(zAxisLabel);
%                                         hold off;
%                                         pause
%                                     end
%                     %%%%%%%%%%%%%%%%%%%%%%%%
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

    disp('Filtrowanie punktów znanych znajduj¹cych siê wewn¹trz zlewni.');
    pointsInsideCatchment = stationsInsideCatchment(catchment(:,1), catchment(:,2), rainfallPoints);
    h=plot(pointsInsideCatchment(:,1),pointsInsideCatchment(:,2),'ro','MarkerSize',5,'LineWidth',1);
    triPoints = [borderPoints; interpolationPoints; pointsInsideCatchment];
    
    hold off;
    %% Dane dla drugiej sieci trójk¹tów
    figure
    hold on;
    xlabel(xAxisLabel);
    ylabel(yAxisLabel);
    plot(catchment(:,1), catchment(:,2), '-r');
    plot(triPoints(:,1), triPoints(:,2) ,'o', 'MarkerSize', 2, 'MarkerFaceColor','black','MarkerEdgeColor','black');
    hold off;
    
    %% Druga triangulacja - punkty dane i interpolowane.
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
    
    hold off;
    %% Wyznaczenie trójk¹tów wewn¹trz granicy
    disp('Wyznaczanie trójk¹tów wewn¹trz granicy zlewni.');
    figure;
    hold on;
    IO = isInterior(triangulation);
    properTriangles = triangulation(IO, :);
    triplot(triangulation(IO, :),triPoints(:,1), triPoints(:,2),'LineWidth', 1)
    plot(triPoints(C'),triPoints(C'+size(triPoints,1)),'-r','LineWidth', 2);
    ylabel(yAxisLabel)
    xlabel(xAxisLabel)
    hold off;
    %%  Wyznaczenie opadu powierzchniowego
    disp('Wyznaczanie objêtoœci opadu w poszczególnych trójk¹tach i ca³ej zlewni.');

    properTrianglesAmmount = length(properTriangles);
    volumes = zeros(properTrianglesAmmount, 2);
    
    for i = 1:properTrianglesAmmount
        triangle = properTriangles(i, :);
        
        points = [
            triPoints(triangle(1),:);
            triPoints(triangle(2),:);
            triPoints(triangle(3),:);
            ];

        baseField = polyarea([points(:,1);points(1,1)], [points(:,2);points(1,2)]); % m2
        avgHeight = mean(points(:,3)) * 0.001;  % 1 mm = 0.001 m
        volumes(i, 1) = baseField * avgHeight;     % w m3
        volumes(i, 2) = precipOnTriangle(@paraboloidalPrecip, points(:,1)', points(:,2)') / 1000; % Wydaje mi siê, ¿e wysokoœæ opadu jest w m zamiast mm. St¹d dzielenie przez 1000
%         volumes(i, 2) = precipOnTriangle(@rationalPrecip, points(:,1)', points(:,2)') / 1000; % precipOnTriangle() daje wynik [mm * m * m] => [mm * m * m]/1000 = m^3

    end

    disp('Objêtoœci opadu w poszczególnych trójk¹tach zapisana w macierzy volumes.');
    totalRainfall = sum(volumes(:,1));
    totalRealRainfall = sum(volumes(:,2));
    diff = (totalRainfall - totalRealRainfall) / totalRealRainfall * 100;
    
    disp(strcat('£¹czny opad powierzchniowy dla zlewni wynosi', {' '}, num2str(totalRainfall),{' '}, 'm3'));
    disp(strcat('Rzeczywista objêtoœæ opadu dla zlewni wynosi', {' '}, num2str(totalRealRainfall),{' '}, 'm3'));
    disp(strcat('Ró¿nica wynosi', {' '}, num2str(diff),{' '}, '%'));
    
    analytics(pos+1, 2:4) = [totalRainfall, totalRealRainfall, diff];
    analytics(pos+1, 5:6) = [totalRainfall - analytics(1, 2), (totalRainfall - analytics(1, 2)) / analytics(1, 2) * 100];
    disp(strcat('Zakoñczono analizê bez punktu nr', {' '}, num2str(pos)));

%     if mod(pos, 5) == 0
%         pause
%     end
    
%  end
toc