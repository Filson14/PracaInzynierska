% Odczyt PW godzinowych wg kod_PW (zapisany np. w tablica_PW

  PW_URL='http://monitor.pogodynka.pl/api/hydro/?id=';

  % savefile = 'PW_DGWeS_08_07_2015_str.mat'
  nW = length(kod_PW); 
  t_str_PW = [];
  for i = 1:nW,
%      i,
    url = strcat(PW_URL,num2str(kod_PW(i)));
    rek = urlread(url);
    s=loadjson(rek);
    t_str_PW(i).Id = s.id;
    t_str_PW(i).Description = s.name;
    t_str_PW(i).State = s.state;
    t_str_PW(i).RiverCourseKm = s.status.riverCourseKm;
    t_str_PW(i).CatchmentArea = s.status.catchmentArea;
    t_str_PW(i).WaterStateRecords = s.waterStateRecords;
    t_str_PW(i).DischargeRecords = s.dischargeRecords;
    t_str_PW(i).HighestHighDischargeValue = s.highestHighDischargeValue;
    t_str_PW(i).MediumHighDischargeValue = s.mediumHighDischargeValue;
    t_str_PW(i).HighDischargeValue = s.highDischargeValue;
    t_str_PW(i).MediumOfYearMediumsDischargeValue = s.mediumOfYearMediumsDischargeValue;
    if i== 1, [2,i], end,
    if i== 10, [2,i], end,
  end  
  [2,i],
  file_name = strcat('PW',datestr(now,'yyyy_mm_dd_HH_MM'),'.mat');
  save(file_name,'t_str_PW');
  disp('PW zapisane w pliku');
  t_str_PW=[];

    
