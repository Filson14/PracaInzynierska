%%
%    clear('rainfallData');
%     rainfallData = readRainfallData(rainfallStations);

%% Przygotowanie danych do triangulacji
stationsAmmount = length(rainfallStations);
triangulation_X = zeros(stationsAmmount, 1);
triangulation_Y = zeros(stationsAmmount, 1);
% triangulation_Z = zeros(stationsAmmount, 1);
for i = 1:stationsAmmount
    triangulation_X(i, 1) = rainfallStations(1, rainfallData(i).stationIndex).longitude;
    triangulation_Y(i, 1) = rainfallStations(1, rainfallData(i).stationIndex).latitude;
    
    %     triangulation
    triangulation_Z(i, 1) = rand(1) * 10;
    %%% Wektor wartoœci dla triangulacji uzupe³niany w³aœciwymi wartoœciami
    %     if isempty(rainfallData(i).hourly)
    %         triangulation_Z(i, 1) = 100;
    %     else
    %         triangulation_Z(i, 1) = rainfallData(i).hourly.value;
    %     end;
    %%%
end

figure
dt = delaunayTriangulation(triangulation_X,triangulation_Y);

triplot(dt, 'y');

%% Labelki elementów na wykresie
% tetramesh(dt,'FaceColor',[0.6875 0.8750 0.8984],'FaceAlpha',0.3);
%
% Display the Vertex and Triangle labels on the plot
hold on
% vxlabels = arrayfun(@(n) {sprintf('%d', n)}, (1:stationsAmmount)');
% Hpl = text(triangulation_X, triangulation_Y, vxlabels, 'FontWeight', 'bold', 'HorizontalAlignment',...
%     'center', 'BackgroundColor', 'none');
% ic = incenter(dt);
% % numtri = size(dt,1);
% % trilabels = arrayfun(@(x) {sprintf('T%d', x)}, (1:numtri)');
% % Htl = text(ic(:,1), ic(:,2), trilabels, 'FontWeight', 'bold', ...
% %    'HorizontalAlignment', 'center', 'Color', 'blue');

%% Rysowanie obszaru zlewni na wykresie
% catchmentsAmmount = length(catchments);
% 
% for i = 1:catchmentsAmmount
%     zlewnia = catchments{i};
%     clear('x');
%     clear('y');
% 
%     pointsAmmount = length(zlewnia.p);
%     %     x = zeros(pointsAmmount, 1);
%     %     y = zeros(pointsAmmount, 1);
%     a = 1;
%     for i = 1:pointsAmmount
%         x(a) = zlewnia.p{1,i}.x;
%         y(a) = zlewnia.p{1,i}.y;
%         a = a + 1;
%     end
%     plot(x,y,'-r');
% end
%% Zlewnia warty do welny
clear('x');
clear('y');

zlewnia.p = Warta_do_Welny;
pointsAmmount = length(zlewnia.p);
%     x = zeros(pointsAmmount, 1);
%     y = zeros(pointsAmmount, 1);
a = 1;
% Na potrzeby analizy zmniejszam dok³adnoœæ granic zlewni.
clear('catchment');
for i = 1:5:pointsAmmount
    catchment(a, 1) = zlewnia.p{1, i}.x;
    catchment(a, 2) = zlewnia.p{1, i}.y;
    x(a) = zlewnia.p{1,i}.x;
    y(a) = zlewnia.p{1,i}.y;
    a = a + 1;
end
plot(x,y,'-r');

%% Punkty przeciêcia granicy zlewni z odninkami triangulacji
% end
ilPunktow = length(x);

for i = 1:ilPunktow
    if i ~= 1
        line = [x(i-1) y(i-1) x(i) y(i)];
        numtri = length(dt.ConnectivityList);
        for j = 1:numtri
            % TODO: Dla przyspieszenia mo¿na zapisywaæ sprawdzone odcinki
            % trójk¹tów ¿eby nie powtarzaæ.
            for k = 1:3
                endOne = rainfallStations(dt.ConnectivityList(j, k));
                endTwo = rainfallStations(dt.ConnectivityList(j, mod(k, 3) + 1));
                line2 = [endOne.longitude endOne.latitude endTwo.longitude endTwo.latitude];
                [intersect_x, intersect_y] = lineintersect(line, line2);
                if ~isnan(intersect_x)
                    h=plot(intersect_x,intersect_y,'rx','MarkerSize',10,'LineWidth',2);
                end
                
            end
        end
    end
end;

ylabel('Szerokoœæ geograficzna')
xlabel('D³ugoœæ geograficzna')

[lolx, loly] = stationsInsideCatchment(x, y, rainfallStations)
h=plot(lolx,loly,'ro','MarkerSize',10,'LineWidth',2);


hold off