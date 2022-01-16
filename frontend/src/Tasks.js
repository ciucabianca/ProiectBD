/*
Cerinte:
- 2 Insert in tabele diferite - DONE (Users & Rentals)
- 2 Update-uri
  - Update rental dates
- 2 Delete-uri
  - Delete rental
- 6 Interogari w Join
  - Rentals:
    - Filter by UserId
    - Filter by CarId
    - Filter by Start/End Date
    - Filter by Start/End Date And CarId
  - Cars:
    - No Filter
    - Filter by Location
    - Filter by CarId
- 4 Interogari w Subcereri

Top 3 cele mai inchiriate Modele
Top 3 cele mai dorite culori
Modelul de masina cu cel mai mare venit
select carid from rentals where locationid in ALL(select locationId from location where locationCity == '"")
*/
