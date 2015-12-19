% Odczyt PO godzinowych wg kod_PO (zapisany np. w tablica_PO)

  PO_URL='http://monitor.pogodynka.pl/api/meteo/?id=';
  nO = length(kod_PO); 
  t_str_PO = [];
  for i = 1:nO,
    url = strcat(PO_URL,num2str(kod_PO(i)));
    rek = urlread(url);
    s = loadjson(rek);
    t_str_PO(i).Id = s.id;
    t_str_PO(i).Description = s.name; 
    t_str_PO(i).Status = s.status; 
    t_str_PO(i).HourlyPrecipRecords = s.hourlyPrecipRecords;
    t_str_PO(i).DailyPrecipRecords = s.dailyPrecipRecords;
    if i== 1, [1,i], end,
    if i== 10, [1,i], end,
  end  
  [1,i],
  file_name = strcat('PO',datestr(now,'yyyy_mm_dd_HH_MM'),'.mat');
  save(file_name,'t_str_PO');
  disp('PO zapisane w pliku');
  t_str_PO=[];

