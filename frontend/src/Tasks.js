/*
Cerinte:
- 2 Insert in tabele diferite - DONE (Users & Rentals)
- 2 Update-uri
  - Update rental dates
  - Update user first and last name
- 2 Delete-uri
  - Delete rental
  - Delete user account
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

select carid from rentals where locationid in ALL
(select locationId from location where locationCity == '"")


SELECT Manufacturer, Model FROM `car_models`
WHERE ModelId in
(SELECT ModelId FROM `car_models`)

SELECT car_models.Manufacturer, car_models.Model, SUM(TotalPrice) FROM `rentals`
JOIN `cars` ON cars.CarId=rentals.CarId
JOIN `car_models` ON cars.ModelId=car_models.ModelId
GROUP BY rentals.CarId
ORDER BY SUM(TotalPrice) DESC
LIMIT 1

SELECT car_models.Manufacturer, car_models.Model, SUM(TotalPrice) FROM `rentals`
JOIN `cars` ON cars.CarId=rentals.CarId
JOIN (SELECT car_models.Manufacturer, car_models.Model, car_models.ModelId FROM  `car_models`) AS `car_models` ON cars.ModelId=car_models.ModelId
GROUP BY rentals.CarId
ORDER BY SUM(TotalPrice) DESC
LIMIT 1

SELECT L.LocationName, COUNT(R.RentalId) FROM `rentals` R
  JOIN `locations` L ON R.LocationId=L.LocationId
  GROUP BY L.LocationName
  HAVING COUNT(*) = (SELECT MAX(X.Rentals) AS RentalsMax
  FROM (SELECT rentals.LocationId, COUNT(rentals.RentalId) AS Rentals FROM `rentals`
  GROUP BY rentals.LocationId)X)

SELECT L.LocationName, SUM(R.TotalPrice) FROM `rentals` R
  JOIN `locations` L ON R.LocationId=L.LocationId
  GROUP BY L.LocationName
  HAVING SUM(R.TotalPrice) = (SELECT MAX(X.Rentals) AS RentalsMax
  FROM (SELECT rentals.LocationId, SUM(rentals.TotalPrice) AS Rentals FROM `rentals`
  GROUP BY rentals.LocationId)X)
*/
