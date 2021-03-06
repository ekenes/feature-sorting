# Load and draw timings

## Order by OFF

Mx migration 2010 2020 points :  1839.6999999284744  ms (null)
EMU data points :  1085.5  ms (null)
USA Census Tract Areas :  1297.8000000715256  ms (null)
field :  216  ms (null)
normalization field :  278.5  ms (null)
value expression :  288.39999997615814  ms (null)
Satellite (MODIS) Thermal Hotspots and Fire Activity :  691.3999999761581  ms (null)
Satellite (VIIRS) Thermal Hotspots and Fire Activity :  27890.899999976158  ms (null)
flash_flood_warnings_2002_2012 :  2195.600000023842  ms (null)
Tornado warnings 2002 to 2011 for interactive demo :  1519.5  ms (null)
USA Counties :  746.2999999523163  ms (null)

## Order by ON

Mx migration 2010 2020 points :  1641.7999999523163  ms ([object Object])
EMU data points :  4724.199999928474  ms ([object Object])
USA Census Tract Areas :  1323.5  ms ([object Object])
field :  255.69999992847443  ms ([object Object])
normalization field :  264.2999999523163  ms ([object Object])
value expression :  251.19999992847443  ms ([object Object])
Satellite (MODIS) Thermal Hotspots and Fire Activity :  638.6000000238419  ms (null)
Satellite (VIIRS) Thermal Hotspots and Fire Activity :  49230.10000002384  ms ([object Object])
flash_flood_warnings_2002_2012 :  1696.6000000238419  ms ([object Object])
Tornado warnings 2002 to 2011 for interactive demo :  1410.2000000476837  ms ([object Object])
USA Counties :  629.5  ms ([object Object])

## Summary - load and draw times

Feature tile cache was used in these times.

Layer | Feature count | Default (ms) | Ordered (client) | Ordered (server) | portal item
------|---------------|---------|---------|------------|-----------------
Mx migration 2010 2020 points | 2032 | 1839 | 1501 | 000 | d0e8a6ef7c39410b9573066f39b70e28
EMU data points | 84705 | 1145 | 1130 | 000 | 9ff162e1ea1a4885acd8c4ceeab588a5
USA Census Tract Areas | 73682 | 1345 | 21287 | 000 | db3f9c8728dd44e4ad455e0c27a85eea
field | 2469 | 313 | 852 | 000 | d0e8a6ef7c39410b9573066f39b70e28
normalization field | 246 | 278 | 781 | 000 | e88d0521e5cf44f6bb29b6ef22a6e307
value expression | 2469 | 653 | 420 | 000 | a412a22973f541f8890e15685f599c8d
Satellite (MODIS) Thermal Hotspots and Fire Activity | 59993 | 798 | n/a | 000 | b8f4033069f141729ffb298b7418b653
Satellite (VIIRS) Thermal Hotspots and Fire Activity | 1356468 | 23969 | 25043 | 000 | dece90af1a0242dcbf0ca36d30276aa3
flash_flood_warnings_2002_2012 | 28443 | 2188 | 8826 | 000 | f9e348953b3848ec8b69964d5bceae02
Tornado warnings 2002 to 2011 for interactive demo | 32620 | 1370 | 17635 | 000 | 105fee001d244d33b90bf3ae5a243679
USA Counties | 3220 | 999 | 661 | 000 | 48f9af87daa241c4b267c5931ad3b226

## Field only stats

Layer | Feature count | Default (ms) | Ordered (client) | Ordered (server) | portal item
------|---------------|---------|---------|------------|-----------------
EMU data points | 84705 | 2575 | 1594 | 2670 | 9ff162e1ea1a4885acd8c4ceeab588a5
USA Census Tract Areas | 73682 | 1114 | 1375 | 1278 | db3f9c8728dd44e4ad455e0c27a85eea
field | 2469 | 325 | 260 | 248 | d0e8a6ef7c39410b9573066f39b70e28
Satellite (MODIS) Thermal Hotspots and Fire Activity | 59993 | 1379 | 949 | 1084 | b8f4033069f141729ffb298b7418b653
Satellite (VIIRS) Thermal Hotspots and Fire Activity | 1356468 | 23969 | 19174 | 20562 | dece90af1a0242dcbf0ca36d30276aa3
flash_flood_warnings_2002_2012 | 28443 | 4545 | 2238 | 2152 | f9e348953b3848ec8b69964d5bceae02
Tornado warnings 2002 to 2011 for interactive demo | 32620 | 1157 | 1220 | 1085 | 105fee001d244d33b90bf3ae5a243679
USA Counties | 3220 | 749 | 490 | 435 | 48f9af87daa241c4b267c5931ad3b226
