MAX_PRECIP = 100;
load ('.\zapisane dane\rainfallPoints.mat');
load ('.\zapisane dane\catchment.mat');
xAxisLabel = 'D³ugoœæ geograficzna';
yAxisLabel = 'Szerokoœæ geograficzna';
zAxisLabel = 'Wysokoœæ opadu [mm]';
close all;
x = linspace(floor(min(rainfallPoints(:,1))), ceil(max(rainfallPoints(:,1))), 70);
y = linspace(floor(min(rainfallPoints(:,2))), ceil(max(rainfallPoints(:,2))), 70);
% x = x.*(xDegree*1000)
% y = y.*(yDegree*1000)
% middle_x = metricMiddleX;
% middle_y = metricMiddleY;
middle_x = geoMiddleX;
middle_y = geoMiddleY;
% catchment(:,1) = catchment(:,1).*(xDegree*1000);
% catchment(:,2) = catchment(:,2).*(yDegree*1000);

[X, Y] = meshgrid(x,y);

% middle_x = min(catchment(:, 1)) + (max(catchment(:, 1)) - min(catchment(:, 1)))/2;
% middle_y = min(catchment(:, 2)) + (max(catchment(:, 2)) - min(catchment(:, 2)))/2;


Z1 = zeros(size(X,1), size(X,2));
Z2 = zeros(size(X,1), size(X,2));
for i=1:size(X,1)
    for j=1:size(X,2)
        Z1(i,j) = ellipsoidalPrecip(X(i,j), Y(i,j));
        Z2(i,j) = rationalPrecip(X(i,j), Y(i,j));
    end
end


figure;
hold on;
surf(X, Y, Z1);
alpha(0.7);
plot(catchment(:,1), catchment(:,2), 'r-', 'LineWidth' , 2);
xlabel(xAxisLabel);
ylabel(yAxisLabel);
zlabel(zAxisLabel);
hold off;

figure;
hold on;
surf(X, Y, Z2);
alpha(0.7);
plot(catchment(:,1), catchment(:,2), 'r-', 'LineWidth' , 2);
xlabel(xAxisLabel);
ylabel(yAxisLabel);
zlabel(zAxisLabel);
hold off;