json = webread('http://monitor.pogodynka.pl/api/hydro/?id=151180140', weboptions('ContentType', 'text'))
% all = loadjson(json);
% 
% x = rand(10,1);
% y = rand(10,1);
% dt = delaunayTriangulation(x,y)
% 
% triplot(dt);
% %
% % Display the Vertex and Triangle labels on the plot
% hold on
% vxlabels = arrayfun(@(n) {sprintf('P%d', n)}, (1:10)');
% Hpl = text(x, y, vxlabels, 'FontWeight', 'bold', 'HorizontalAlignment',...
%    'center', 'BackgroundColor', 'none');
% ic = incenter(dt);
% numtri = size(dt,1);
% trilabels = arrayfun(@(x) {sprintf('T%d', x)}, (1:numtri)');
% Htl = text(ic(:,1), ic(:,2), trilabels, 'FontWeight', 'bold', ...
%    'HorizontalAlignment', 'center', 'Color', 'blue');
% 
% ilosc = length(wisla_do_sanu.p);
% for i = 1:ilosc
%     x(i) = wisla_do_sanu.p{1,i}.x;
%     y(i) = wisla_do_sanu.p{1,i}.y;
% end
% plot(x, y)
% 
% hold off