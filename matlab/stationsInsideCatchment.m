function [ stationsInsideX, stationsInsideY ] = stationsInsideCatchment( x, y, stations )
%STATIONSINSIDECATCHMENT Summary of this function goes here
%   Detailed explanation goes here
    stationsCount = length(stations);

    xq = zeros(stationsCount,1);
    yq = zeros(stationsCount,1);
    
    for i = 1:stationsCount
       xq(i) = stations(i).longitude;
       yq(i) = stations(i).latitude;
    end
    
    [in, on] = inpolygon(xq, yq, x, y);   
    
    stationsInsideX = vertcat(xq(in), xq(on));
    stationsInsideY = vertcat(yq(in), yq(on));
end

