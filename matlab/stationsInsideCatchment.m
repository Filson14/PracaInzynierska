function [ stationsInside ] = stationsInsideCatchment( x, y, stations )
%STATIONSINSIDECATCHMENT Summary of this function goes here
%   Detailed explanation goes here
    in = inpolygon(stations(:,1), stations(:,2), x, y);   
    stationsInside = stations(in,:);
end

